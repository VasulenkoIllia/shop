import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderEntity } from "../../order/order.entity";

@Entity()
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  name: string;

  @Column({ length: 20 })
  phone: string;

  @Column({ length: 100 })
  address: string;

  @Column("text")
  description: string;

  @OneToMany(() => OrderEntity, order => order.customer)
  orders: OrderEntity[];

}
