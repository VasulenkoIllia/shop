import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Page } from './db/page/page.entity';
import { PageHttpModule } from './db/page/page-http.module';
import { CategoryHttpModule } from './db/category/category-http.module';
import { Category } from './db/category/category.entity';
import { CustomersModule } from './db/customers/customers.module';
import { Customer } from './db/customers/entities/customer.entity';
import { ItemsModule } from './db/items/items.module';
import { Items } from './db/items/entities/item.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'shop',
      password: 'shop',
      database: 'shop',
      entities: [Page, Category, Customer, Items],
      synchronize: true,
    }),
    PageHttpModule,
    CategoryHttpModule,
    CustomersModule,
    ItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
