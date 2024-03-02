import { Body, ClassSerializerInterceptor, Controller, Get, Param, Post, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { LinkService } from './link.service';
import { AuthGuard } from '../auth/auth.guard';
import { AuthService } from '../auth/auth.service';
import { Request } from 'express';
import { Link } from './entities/link.entity';
import { Order } from 'src/order/entities/order.entity';
import { OrderService } from 'src/order/order.service';

@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class LinkController {
    constructor(
        private linkService: LinkService,
        private authService: AuthService,
    ) {
    }

    @UseGuards(AuthGuard)
    @Get('admin/users/:id/links')
    async all(@Param('id') id: number) {
        console.log(id)
        return this.linkService.find(
        {
            where: {user: {id} },
            relations: ['orders', 'orders.order_items']
        })
    }

    @UseGuards(AuthGuard)
    @Post('ambassador/links')
    async create(
        @Body('products') products: number[],
        @Req() request: Request
    ) {
        const user = await this.authService.user(request)
        return this.linkService.save({
            code: Math.random().toString(36).substring(0, 6),
            user,
            products: products.map(id => ({id}))
        })
    }

    @UseGuards(AuthGuard)
    @Get('ambassador/stats')
    async stats(
        @Req() request: Request
    ) {
        const user = await this.authService.user(request)
        const links: Link[] = await this.linkService.find({
            where: {user},
            relations: ['orders']
        })

        return links.map(link => {
            const completedOrders: Order[] = link.orders.filter(o => o.complete)
            return {
                code: link.code,
                count: completedOrders.length,
                revenue: completedOrders.reduce((s, o) => s + o.ambassador_revenue, 0)
            }
        })
    }

    @Get('checkout/links/:code')
    async link(@Param('code') code: string) {
        return this.linkService.findOne({
            where: {
                code
            },
            relations: ['user', 'products']
        })
    }
}
