import {Controller, Get, Post, Request, UseGuards} from '@nestjs/common';
import {AppService} from './app.service';
import {AuthGuard} from "@nestjs/passport";
import {LocalAuthGuard} from "./db/auth/local-auth.guard";
import {AuthService} from "./db/auth/auth.service";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService,
                private authService: AuthService) {
    }

    @Get()
    getHello(): string {
        return this.appService.getHello();
    }


    @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req) {
        return this.authService.login(req.user);
    }
}
