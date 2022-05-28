import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from './entities/customer.entity';

@Injectable()
export class CustomersService {
  constructor(
    @InjectRepository(Customer)
    private readonly repository: Repository<Customer>,
  ) {}

  create(createCustomerDto: CreateCustomerDto) {
    return this.repository.save(createCustomerDto);
  }

  findAll() {
    return this.repository.find();
  }

  findOne(id: number) {
    return this.repository.findOne(id);
  }

  async update(id: number, updateCustomerDto: UpdateCustomerDto) {
    const customer = await this.repository.findOne(id);
    if (!customer) {
      throw new Error('Customer do not found');
    }
    return this.repository.save({
      ...customer,
      ...updateCustomerDto,
    });
  }

  async remove(id: number) {
    const customer = await this.repository.findOne(id);
    if (!customer) {
      throw new Error('Customer do not found');
    }
    const result = await this.repository.delete(id);
    return {
      success: result.affected > 0,
    };
  }
}
