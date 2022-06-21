import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Items } from '../items/entities/item.entity';

@Entity()
export class ImageItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;

  @ManyToOne(() => Items, (item) => item.images, { onDelete: 'CASCADE' })
  item: Items;
}
