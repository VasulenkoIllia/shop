import { Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn} from "typeorm";
import {ImageItemEntity} from "../image-item/image.item.entity";

@Entity()
export class PhotoEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @OneToOne(() => ImageItemEntity)
    @JoinColumn()
    path: ImageItemEntity;


}