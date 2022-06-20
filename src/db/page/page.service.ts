import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Page } from "./page.entity";
import { CreatePageDto } from "./page.dto";
import { SuccessDto } from "../../dto/success.dto";

@Injectable()
export class PageService {
  constructor(
    @InjectRepository(Page)
    private readonly pageRepository: Repository<Page>
  ) {
  }


  async all(): Promise<Page[]> {
    return this.pageRepository.find();
  }

  async queryBuilder(alias: string) {
    return this.pageRepository.createQueryBuilder(alias);
  }

  findAll(): Promise<Page[]> {
    return this.pageRepository.find();
  }

  findById(id: number): Promise<Page> {
    return this.pageRepository.findOne(id);
  }

  create(data: CreatePageDto): Promise<Page> {
    return this.pageRepository.save(data);
  }

  async edit(id: number, data: CreatePageDto): Promise<Page> {
    const page = await this.pageRepository.findOne(id);
    if (!page) {
      throw new Error("Page do not found");
    }
    return this.pageRepository.save({
      ...page,
      ...data
    });
  }

  async delete(id: number): Promise<SuccessDto> {
    const page = await this.pageRepository.findOne(id);
    if (!page) {
      throw new Error("Page do not found");
    }
    const result = await this.pageRepository.delete(id);
    return {
      success: result.affected > 0
    };
  }
}
