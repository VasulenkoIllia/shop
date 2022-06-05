import { Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from "typeorm";

import { Items } from "../items/entities/item.entity";

@Entity()
export class ImageItemEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  path: string;


  @OneToOne(() => Items)
  @JoinColumn()
  category: Items;
}
