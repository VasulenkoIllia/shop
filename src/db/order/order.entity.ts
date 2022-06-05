import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "../customers/entities/customer.entity";
import { OrderItemEntity } from "../order-item/order-item.entity";

@Entity()
export class OrderEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: "created" })
  status: string;

  @OneToMany(() => OrderItemEntity, items => items.order)
  items: OrderItemEntity[];

  @ManyToOne(() => Customer, customer => customer.orders)
  customer: Customer;


}