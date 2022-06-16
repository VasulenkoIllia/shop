import {Injectable} from "@nestjs/common";
import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {UsersEntity} from "./users.entity";
import {CreateUsersDto} from "./dto/create-users.dto";
import {SuccessDto} from "../../dto/success.dto";
import {HelpersService} from "../helpers/helpers.service";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersEntity)
        private readonly repository: Repository<UsersEntity>
    ) {
    }

    create(createUsersDto: CreateUsersDto) :Promise<CreateUsersDto>{
        return this.repository.save(createUsersDto)
    }

    findAll(): Promise<UsersEntity[]> {
        return this.repository.find();
    }

    async findOne(id: number): Promise<UsersEntity> {
        await HelpersService.checkTransmittedData(this.repository, id)
        return this.repository.findOne(id);
    }

    async remove(id: number): Promise<SuccessDto> {
        await HelpersService.checkTransmittedData(this.repository, id)
        const result = await this.repository.delete(id);
        return {
            success: result.affected > 0,
        }

    }
}