import { Module } from '@nestjs/common';
import { PageModule } from './page.module';
import { PageController } from './page.controller';

@Module({
  imports: [PageModule],
  controllers: [PageController],
})
export class PageHttpModule {}
