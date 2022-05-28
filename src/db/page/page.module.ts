import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PageService } from './page.service';
import { Page } from './page.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Page])],
  providers: [PageService],
  exports: [PageService],
})
export class PageModule {}
