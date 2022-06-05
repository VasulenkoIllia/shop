import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { ImageItemService } from "./image-item.service";
import { CreateItemImageDto } from "./dto/create-item-image.dto";
import { UpdateItemImageDto } from "./dto/update-item-image.dto";

@ApiTags("ImageItem")
@Controller("image-item")
export class ImageItemController {
  constructor(private readonly imageItemService: ImageItemService) {
  }

  @Post()
  create(@Body() createItemImageDto: CreateItemImageDto) {
    return this.imageItemService.create(createItemImageDto);
  }

  @Get()
  findAll() {
    return this.imageItemService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.imageItemService.findOne(+id);
  }

  @Patch(":id")
  update(@Param("id") id: string, @Body() updateImageItemDto: UpdateItemImageDto) {
    return this.imageItemService.update(+id, updateImageItemDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.imageItemService.remove(+id);
  }
}