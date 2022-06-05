import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Customer } from "../customers/entities/customer.entity";
import { Repository } from "typeorm";
import { OrderEntity } from "./order.entity";
import { CreateOrderDto } from "./dto/create-order.dto";
import { UpdateOrderDto } from "./dto/update-order.dto";


@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly repository: Repository<OrderEntity>,
    @InjectRepository(Customer)
    private readonly customerRepository: Repository<Customer>
  ) {
  }

  async create(createOrderDto: CreateOrderDto) {
    const customer = await this.customerRepository.findOne(
      createOrderDto.customerId
    );
    if (!customer) {
      throw new Error("customer not found");
    }
    return this.repository.save({
      ...createOrderDto,
      customer

    });

  }

  findAll() {
    return this.repository.find({ relations: ["customer"] });
  }

  findOne(id: number) {
    return this.repository.findOne(id, { relations: ["customer"] });
  }

  async update(id: number, updateOrderDto: UpdateOrderDto) {
    const order = await this.repository.findOne(id);
    if (!order) {
      throw new Error("order do not found");
    }
    const customer = await this.customerRepository.findOne(
      updateOrderDto.customerId
    );
    if (!customer) {
      throw new Error("customer do not found");
    }
    return this.repository.save({
      ...order,
      ...updateOrderDto,
      customer
    });
  }

  async remove(id: number) {
    const order = await this.repository.findOne(id);
    if (!order) {
      throw new Error("order do not found");
    }
    const result = await this.repository.delete(id);
    return {
      success: result.affected > 0
    };

  }
}