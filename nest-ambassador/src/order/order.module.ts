import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';
import { OrderItemService } from './order-item.service';
import { SharedModule } from '../shared/shared.module';
import { LinkService } from '../link/link.service';
import { ProductModule } from '../product/product.module';
import { LinkModule } from '../link/link.module';
import { StripeModule } from '@golevelup/nestjs-stripe';
import { ConfigService } from '@nestjs/config';
import { OrderListener } from './listeners/order.listener';
import { MailerModule } from '@nestjs-modules/mailer';


@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem]),
    SharedModule,
    ProductModule,
    LinkModule,
    // StripeModule.forRoot(StripeModule, {
    //   apiKey: 'sk_test_51N036vFkNsK3rQNn9MEgqFLrJHU7PqFV9pLGRZPp96DJ77TQFwcFnWVji036XDb7FZ8XUmxMmWNSUEyiHxCVtMLJ00UXvivMam',
    // }),
    StripeModule.forRootAsync(StripeModule, {
      useFactory: (configService: ConfigService) => ({
        apiKey: configService.get('STRIPE_API_KEY'), // Replace with your actual config keys
      }),
      inject: [ConfigService],
    } as any),
    MailerModule.forRoot({
      transport: {
        host: 'docker.for.mac.localhost',
        port: 1025
      },
      defaults: {
        from: "no-reply@example.com"
      }
    })
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderItemService, OrderListener],
})
export class OrderModule {}
