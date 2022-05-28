import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Category } from '../../category/category.entity';

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
}
