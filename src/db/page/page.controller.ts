import { Controller, Get } from '@nestjs/common';

@Controller('page')
export class PageController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
