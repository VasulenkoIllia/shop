import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Page } from './page.entity';
import { CreatePageDto } from './page.dto';

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(Page)
    private readonly pageRepository: Repository<Page>,
  ) {}

  findAll(): Promise<Page[]> {
    return this.pageRepository.find();
  }

  findById(id: number): Promise<Page> {
    return this.pageRepository.findOne(id);
  }

  create(data: CreatePageDto): Promise<Page> {
    return this.pageRepository.save(data);
  }
}
