import { BadRequestException, Body, ClassSerializerInterceptor, Controller, Get, NotFoundException, Post, UseGuards, UseInterceptors } from '@nestjs/common';
import { OrderService } from './order.service';
import { AuthGuard } from '../auth/auth.guard';
import { CreateOrderDto } from './dtos/create-order.dto';
import { LinkService } from '../link/link.service';
import { Order } from './entities/order.entity';
import { Link } from '../link/entities/link.entity';
import { ProductService } from '../product/product.service';
import { OrderItem } from './entities/order-item.entity';
import { Product } from '../product/entities/product.entity';
import { OrderItemService } from './order-item.service';
import { DataSource } from 'typeorm';
import { InjectStripeClient } from '@golevelup/nestjs-stripe';
import Stripe from 'stripe';
import { ConfigService } from '@nestjs/config';
import { EventEmitter2 } from '@nestjs/event-emitter';

@Controller()
export class OrderController {
    constructor(
        private orderService: OrderService,
        private orderItemService: OrderItemService,
        private linkService: LinkService,
        private productService: ProductService,
        private dataSource: DataSource,
        @InjectStripeClient() private readonly stripeClient: Stripe,
        private configService: ConfigService,
        private eventEmitter: EventEmitter2
    ) {}

    
    @UseGuards(AuthGuard)
    @UseInterceptors(ClassSerializerInterceptor)
    @Get('admin/orders')
    all() {
        return this.orderService.find({
            relations: ['order_items']
        })
    }

    @Post('checkout/orders')
    async create(@Body() body: CreateOrderDto) {
        const link: Link = await this.linkService.findOne({
            where: {
                code: body.code
            },
            relations: ['user']
        })


        if (!link) {
            throw new BadRequestException('Invalid link!')
        }

        const queryRunner = this.dataSource.createQueryRunner();
        try {
            await queryRunner.connect();
            await queryRunner.startTransaction();

            const o = new Order();
            o.user_id = link.user.id; // the user is an ambassador
            o.ambassador_email = link.user.email;
            o.first_name = body.first_name;
            o.last_name = body.last_name;
            o.email = body.email;
            o.address = body.address;
            o.country = body.address;
            o.city = body.city;
            o.zip = body.zip;
            o.code = body.code;
            console.log("zzgot here!", body)

            const order = await queryRunner.manager.save(o)
            console.log("got here!")

            const line_items = [];
    
            for (let p of body.products) {
                const product: Product = await this.productService.findOne({where: {id: p.product_id}})
                console.log(product)
                const orderItem = new OrderItem();
                orderItem.order = order;
                orderItem.product_title = product.title
                orderItem.price = product.price;
                orderItem.quantity = p.quantity;
                orderItem.ambassador_revenue = 0.1 * product.price * p.quantity;
                orderItem.admin_revenue = 0.9 * product.price * p.quantity;
    
                await queryRunner.manager.save(orderItem)

                line_items.push({
                    'price_data': {
                      'currency': 'usd',
                      'unit_amount': 100 * product.price,
                      'product_data': {
                        'name': product.title,
                        'description': product.description,
                        'images': [product.image],
                      },
                    },
                    'quantity': p.quantity,
                  })
            }
            
            const source = await this.stripeClient.checkout.sessions.create({
                line_items,
                mode: "payment",
                success_url: `${this.configService.get('CHECKOUT_URL')}/success?source={CHECKOUT_SESSION_ID}`,
                cancel_url: `${this.configService.get('CHECKOUT_URL')}/error`
            })
        
            console.log("setting")
            order.transaction_id = source['id']
            await queryRunner.manager.save(order)

            await queryRunner.commitTransaction()
            return source
        } catch(e) {
            console.log(e)
            await queryRunner.rollbackTransaction()
            throw new BadRequestException()
        } finally {
            await queryRunner.release()
        }
    }

    @Post('checkout/orders/confirm')
    async confirm(@Body('source') source: string) {
        const order = await this.orderService.findOne({
            where: {
                transaction_id: source,
            },
            relations: ['order_items', 'user']
        });

        console.log(order)

        if (!order) {
            throw new NotFoundException('Order not found')
        }

        await this.orderService.update(order.id, {complete: true})

        await this.eventEmitter.emit('order.completed', order)

        return {
            message: 'success'
        }

    }
}
