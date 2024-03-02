import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";

@Entity('order_items')
export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    product_title: string;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    price: number;

    @Column()
    quantity: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    admin_revenue: number;

    @Column({ type: 'decimal', precision: 10, scale: 2 })
    ambassador_revenue: number;

    @ManyToOne(() => Order, order => order.order_items)
    @JoinColumn({name: "order_id"})
    order: Order;
}