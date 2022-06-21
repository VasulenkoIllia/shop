import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrderEntity } from './order.entity';
import { Customer } from '../customers/entities/customer.entity';
import { Items } from '../items/entities/item.entity';
import { OrderItemEntity } from '../order-item/order-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderEntity, Customer, Items, OrderItemEntity]),
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
