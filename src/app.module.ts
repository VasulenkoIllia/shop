import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Page } from './db/page/page.entity';
import { PageHttpModule } from './db/page/page-http.module';
import { CategoryHttpModule } from './db/category/category-http.module';
import { Category } from './db/category/category.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'shop',
      password: 'shop',
      database: 'shop',
      entities: [Page, Category],
      synchronize: true,
    }),
    PageHttpModule,
    CategoryHttpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
