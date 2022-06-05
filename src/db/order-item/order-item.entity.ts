import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Items } from "../items/entities/item.entity";
import { OrderEntity } from "../order/order.entity";


@Entity()
export class OrderItemEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  price: number;

  @ManyToOne(() => OrderEntity, order => order.items, { onDelete: 'CASCADE' })
  order: OrderEntity;

  @ManyToOne(() => Items, item => item.id)
  item: Items;


}