import {
    CallHandler, Controller, ExecutionContext, Get, Injectable, NestInterceptor, Post, Request, UseGuards
} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {ApiBearerAuth, ApiBody, ApiConsumes, ApiTags} from "@nestjs/swagger";
import {LocalAuthGuard} from "./local-auth.guard";
import {JwtAuthGuard} from "./jwt-auth.guard";
import {Observable} from "rxjs";

@ApiTags("auth")
@Controller("auth")
export class AuthController {
    constructor(
        private readonly authService: AuthService) {
    }

    @ApiBody({
        schema: {
            type: "object",
            properties: {
                email: {type: "string"},
                password: {type: "string"},
            }
        }
    })
    @UseGuards(LocalAuthGuard)
    @Post("/login")
    async login(@Request() req) {
        const {access_token} = this.authService.login(req.user);
        return access_token
        return {
            ...req.user,
            access_token
        };
    }

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get("profile")
    getProfile(@Request() req) {
        return req.user;
    }
}

