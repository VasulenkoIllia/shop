import { Controller, Get, Param } from '@nestjs/common';
import { PageService } from './page.service';
import { Page } from './page.entity';

@Controller('page')
export class PageController {
  constructor(private readonly pageService: PageService) {}

  @Get()
  findAll(): Promise<Page[]> {
    return this.pageService.findAll();
  }

  @Get('/:id')
  async findById(@Param() id: number): Promise<Page> {
    const page = await this.pageService.findById(id);
    if (page) {
      return page;
    }
    throw new Error('Page do not found');
  }
}
