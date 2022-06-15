import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Page } from "./db/page/page.entity";
import { PageHttpModule } from "./db/page/page-http.module";
import { CategoryHttpModule } from "./db/category/category-http.module";
import { Category } from "./db/category/category.entity";
import { CustomersModule } from "./db/customers/customers.module";
import { Customer } from "./db/customers/entities/customer.entity";
import { ItemsModule } from "./db/items/items.module";
import { Items } from "./db/items/entities/item.entity";
import { ImageItemModule } from "./db/image-item/image-item.module";
import { ImageItemEntity } from "./db/image-item/image.item.entity";
import { OrderModule } from "./db/order/order.module";
import { OrderEntity } from "./db/order/order.entity";
import { OrderItemModule } from "./db/order-item/order-item.module";
import { OrderItemEntity } from "./db/order-item/order-item.entity";
import { MulterModule } from "@nestjs/platform-express";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "localhost",
      port: 3306,
      username: "shop",
      password: "shop",
      database: "shop",
      entities: [Page, Category, Customer, Items, ImageItemEntity, OrderEntity, OrderItemEntity],
      synchronize: true
    }),
    PageHttpModule,
    CategoryHttpModule,
    CustomersModule,
    ItemsModule,
    ImageItemModule,
    OrderModule,
    OrderItemModule,
    MulterModule.register({
      dest: './files',
    })

  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
}
