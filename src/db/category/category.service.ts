import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './category.dto';
import { SuccessDto } from '../../dto/success.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  findById(id: number): Promise<Category> {
    return this.categoryRepository.findOne(id);
  }

  create(data: CreateCategoryDto): Promise<Category> {
    return this.categoryRepository.save(data);
  }

  async edit(id: number, data: CreateCategoryDto): Promise<Category> {
    const page = await this.categoryRepository.findOne(id);
    if (!page) {
      throw new Error('Page do not found');
    }
    return this.categoryRepository.save({
      ...page,
      ...data,
    });
  }

  async delete(id: number): Promise<SuccessDto> {
    const page = await this.categoryRepository.findOne(id);
    if (!page) {
      throw new Error('Page do not found');
    }
    const result = await this.categoryRepository.delete(id);
    return {
      success: result.affected > 0,
    };
  }
}
