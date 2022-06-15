import {Injectable} from '@nestjs/common';
import {CreateItemDto} from './dto/create-item.dto';
import {UpdateItemDto} from './dto/update-item.dto';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';
import {Items} from './entities/item.entity';
import {Category} from '../category/category.entity';
import * as fs from "fs";
import {ImageItemEntity} from "../image-item/image.item.entity";
import {HelpersService} from "../helpers/helpers.service";

@Injectable()
export class ItemsService {
    constructor(
        @InjectRepository(Items)
        private readonly repository: Repository<Items>,
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {
    }

    async create(createCustomerDto: CreateItemDto) {
        const category = await this.categoryRepository.findOne(
            createCustomerDto.categoryId,
        );
        if (!category) {
            throw new Error('category not found');
        }
        return this.repository.save({
            ...createCustomerDto,
            category,
        });
    }

    findAll() {
        return this.repository.find();
    }

    findOne(id: number) {
        return this.repository.findOne(id, {relations: ['images']});
    }

    async update(id: number, updateCustomerDto: UpdateItemDto) {
        const item = await this.repository.findOne(id);
        if (!item) {
            throw new Error('item do not found');
        }
        const category = await this.categoryRepository.findOne(
            updateCustomerDto.categoryId,
        );
        if (!category) {
            throw new Error('category not found');
        }
        return this.repository.save({
            ...item,
            ...updateCustomerDto,
            category,
        });
    }

    clearPhoto(images: ImageItemEntity[]) {
        if (!images) {
            return
        }
        images.forEach(function (item) {
            fs.unlink( HelpersService.basePathToUnlinc + item.path, (e) => {
                if (e) {
                    console.log(e)
                }
            })
        })
    }

    async remove(id: number) {
        const items = await this.repository.findOne(id, {relations: ['images']});
        if (!items) {
            throw new Error('Item do not found');
        }

        this.clearPhoto(items.images)

        const result = await this.repository.delete(id);
        return {
            success: result.affected > 0,
        };
    }
}
