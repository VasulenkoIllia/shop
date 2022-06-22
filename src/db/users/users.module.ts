import {Module} from '@nestjs/common';
import {TypeOrmModule} from '@nestjs/typeorm';
import {UsersEntity} from "./users.entity";
import {UsersService} from "./users.service";
import {UsersController} from "./users.controller";
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from '../roles/roles.guard';

@Module({
    imports: [TypeOrmModule.forFeature([UsersEntity])],
    controllers: [UsersController],
    providers: [UsersService,
    //     {
    //     provide: APP_GUARD,
    //     useClass: RolesGuard
    // }
    ],
    exports: [UsersService]
})
export class UsersModule {
}
