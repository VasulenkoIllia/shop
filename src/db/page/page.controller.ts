import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PageService } from './page.service';
import { Page } from './page.entity';
import { CreatePageDto } from './page.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('page')
@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Get()
  findAll(): Promise<Page[]> {
    return this.pageService.findAll();
  }

  @Get('/:id')
  async findById(@Param('id') id: number): Promise<Page> {
    const page = await this.pageService.findById(id);
    if (page) {
      return page;
    }
    throw new Error('Page do not found');
  }

  @Post()
  addPage(@Body() data: CreatePageDto): Promise<Page> {
    return this.pageService.create(data);
  }
}
