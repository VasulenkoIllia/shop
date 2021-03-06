import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ImageItemEntity } from './image.item.entity';
import { Repository } from 'typeorm';
import { Items } from '../items/entities/item.entity';
import { CreateItemImageDto } from './dto/create-item-image.dto';
import * as fs from 'fs';

@Injectable()
export class ImageItemService {
  constructor(
    @InjectRepository(ImageItemEntity)
    private readonly repository: Repository<ImageItemEntity>,
    @InjectRepository(Items)
    private readonly itemsRepository: Repository<Items>,
  ) {}

  async create(createImageItemDto: CreateItemImageDto) {
    const item = await this.itemsRepository.findOne(createImageItemDto.itemId);
    if (!item) {
      throw new Error('item not found');
    }

    return this.repository.save({
      ...createImageItemDto,
      item,
    });
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  async remove(id: number) {
    const image = await this.repository.findOne(id);
    if (!image) {
      throw new Error('image do not found');
    }
    fs.unlink(image.path, (e) => {
      if (e) {
        console.log(e);
      }
    });
    console.log(image.path);
    const result = await this.repository.delete(id);
    return {
      success: result.affected > 0,
    };
  }
}
