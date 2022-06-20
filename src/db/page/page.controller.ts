import { Body, Controller, Delete, Get, Param, Post, Put, Req } from "@nestjs/common";
import { PageService } from "./page.service";
import { Page } from "./page.entity";
import { CreatePageDto } from "./page.dto";
import { ApiConsumes, ApiTags } from "@nestjs/swagger";
import { SuccessDto } from "../../dto/success.dto";
import { Request } from "express";

@ApiTags("page")
@Controller("page")
export class PageController {
  constructor(private readonly pageService: PageService) {
  }

  @ApiConsumes()
  @Get("pagination", )
  async pagination(@Req() req: Request) {
    const builder = await this.pageService.queryBuilder("page");
    const page: number = parseInt(req.query.page as any) || 1;
     const perPage = 5;
    const total = await builder.getCount();

    builder.offset((page - 1) * perPage).limit(perPage);

    return {
      data: await builder.getMany(),
      total,
      page,
      lastPage: Math.ceil(total / perPage)
    };
  }

  @Get()
  findAll(): Promise<Page[]> {
    return this.pageService.findAll();
  }

  @Get("/:id")
  async findById(@Param("id") id: number): Promise<Page> {
    const page = await this.pageService.findById(id);
    if (page) {
      return page;
    }
    throw new Error("Page do not found");
  }

  @Post()
  add(@Body() data: CreatePageDto): Promise<Page> {
    return this.pageService.create(data);
  }

  @Put("/:id")
  edit(@Param("id") id: number, @Body() data: CreatePageDto): Promise<Page> {
    return this.pageService.edit(id, data);
  }

  @Delete("/:id")
  delete(@Param("id") id: number): Promise<SuccessDto> {
    return this.pageService.delete(id);
  }
}
