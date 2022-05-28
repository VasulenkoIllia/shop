import { Module } from '@nestjs/common';
import { PageModule } from './page.module';
import { PageService } from './page.service';
import { PageController } from './page.controller';

@Module({
  imports: [PageModule],
  providers: [PageService],
  controllers: [PageController],
})
export class PhotoHttpModule {}
