import { Injectable } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Items } from './entities/item.entity';
import { Category } from '../category/category.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Items)
    private readonly repository: Repository<Items>,
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCustomerDto: CreateItemDto) {
    const category = await this.categoryRepository.findOne(
      createCustomerDto.categoryId,
    );
    if (!category) {
      throw new Error('category not found');
    }
    return this.repository.save({
      ...createCustomerDto,
      category,
    });
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  async update(id: number, updateCustomerDto: UpdateItemDto) {
    const item = await this.repository.findOne(id);
    if (!item) {
      throw new Error('item do not found');
    }
    const category = await this.categoryRepository.findOne(
      updateCustomerDto.categoryId,
    );
    if (!category) {
      throw new Error('category not found');
    }
    return this.repository.save({
      ...item,
      ...updateCustomerDto,
      category,
    });
  }

  async remove(id: number) {
    const customer = await this.repository.findOne(id);
    if (!customer) {
      throw new Error('Item do not found');
    }
    const result = await this.repository.delete(id);
    return {
      success: result.affected > 0,
    };
  }
}
