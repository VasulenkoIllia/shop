import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrderEntity } from "./order.entity";
import { Customer } from "../customers/entities/customer.entity";

@Module({
  imports: [TypeOrmModule.forFeature([OrderEntity, Customer])],
  controllers: [OrderController],
  providers: [OrderService]
})
export class OrderModule {}
