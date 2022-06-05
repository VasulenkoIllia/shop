import { Module } from "@nestjs/common";
import { ImageItemController } from "./image-item.controller";
import { ImageItemService } from "./image-item.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Items } from "../items/entities/item.entity";
import { ImageItemEntity } from "./image.item.entity";

@Module({
  imports: [TypeOrmModule.forFeature([ImageItemEntity, Items])],
  controllers: [ImageItemController],
  providers: [ImageItemService]
})
export class ImageItemModule {
}
