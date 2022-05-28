import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Page } from './page.entity';

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(Page)
    private readonly photoRepository: Repository<Page>,
  ) {}

  findAll(): Promise<Page[]> {
    return this.photoRepository.find();
  }
}
