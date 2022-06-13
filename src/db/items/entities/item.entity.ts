import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn, OneToMany,
} from 'typeorm';
import { Category } from '../../category/category.entity';
import {ImageItemEntity} from "../../image-item/image.item.entity";
import {OrderEntity} from "../../order/order.entity";

@Entity()
export class Items {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  title: string;

  @Column('text')
  description: string;

  @Column()
  price: number;

  @Column()
  availability: boolean;

  @OneToOne(() => Category)
  @JoinColumn()
  category: Category;

  @OneToMany(() => ImageItemEntity, image => image.item)
  images: ImageItemEntity[];
}
