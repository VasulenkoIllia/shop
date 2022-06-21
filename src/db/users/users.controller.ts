import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Body, Controller, Delete, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUsersDto } from './dto/create-users.dto';
import { UsersEntity } from './users.entity';
import { HelpersService } from '../helpers/helpers.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(
    @Body() createUsersDto: CreateUsersDto,
  ): Promise<CreateUsersDto> {
    const password = await HelpersService.hashData(createUsersDto.password);
    return this.usersService.create({
      ...createUsersDto,
      password,
    });
  }


  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @Get()
  findAll(): Promise<UsersEntity[]> {
    return this.usersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<UsersEntity> {
    const user = await this.usersService.findOne(id);
    if (user) {
      return user;
    }
    throw new Error();
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
