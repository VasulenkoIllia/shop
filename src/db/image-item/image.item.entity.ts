import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';

import { Items } from "../items/entities/item.entity";

@Entity()
export class ImageItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  path: string;


  @OneToOne(() => Items)
  @JoinColumn()
  category: Items;
}
