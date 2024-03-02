import { ClassSerializerInterceptor, Controller, Get, Res, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../auth/auth.guard';
import { User } from './entities/user.entity';
import { RedisService } from '../shared/redis.service';
import { Response } from "express"

@UseGuards(AuthGuard)
@Controller()
@UseInterceptors(ClassSerializerInterceptor)
export class UserController {

    constructor(
        private readonly userService: UserService,
        private redisService: RedisService
        ) {

    }


    @Get('admin/ambassadors')
    async ambassadors() {
        return await this.userService.find({where: {
            is_ambassador: true
        }})
    }

    @Get('ambassador/rankings')
    async rankings(){
        // const ambassadors: User[] = await this.userService.find({
        //     is_ambassador: true,
        //     relations: ['orders', 'orders.order_items']
        // })

        // return ambassadors.map(ambassador => {
        //     return {
        //         name: ambassador.name,
        //         revenue: ambassador.revenue
        //     }
        // })
        const client = this.redisService.getClient()
        const rankings = await client.zRangeWithScores('rankings', '+inf', '-inf', {
            BY: 'SCORE',
            REV: true,
          })
        
        const combined_list = {};
        
        for (const item of rankings) {
            combined_list[item['value']] = item['score']
        }
        
        return combined_list
    }
}
