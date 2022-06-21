import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { Category } from './category.entity';
import { CreateCategoryDto } from './category.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { SuccessDto } from '../../dto/success.dto';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @ApiBearerAuth()
  @Get()
  findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get('/:id')
  async findById(@Param('id') id: number): Promise<Category> {
    const page = await this.categoryService.findById(id);
    if (page) {
      return page;
    }
    throw new Error('Page do not found');
  }

  @Post()
  add(@Body() data: CreateCategoryDto): Promise<Category> {
    return this.categoryService.create(data);
  }

  @Put('/:id')
  edit(
    @Param('id') id: number,
    @Body() data: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.edit(id, data);
  }

  @Delete('/:id')
  delete(@Param('id') id: number): Promise<SuccessDto> {
    return this.categoryService.delete(id);
  }
}
