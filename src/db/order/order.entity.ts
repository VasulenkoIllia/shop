import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Customer } from "../customers/entities/customer.entity";

@Entity()
export class OrderEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: "created" })
  status: string;

  @ManyToOne(() => Customer, customer => customer.orders)
  customer: Customer;

}