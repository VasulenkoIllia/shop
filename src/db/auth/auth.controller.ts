import {
    CallHandler, Controller, ExecutionContext, Get, Injectable, NestInterceptor, Post, Request, UseGuards
} from "@nestjs/common";
import {AuthService} from "./auth.service";
import {ApiBody, ApiConsumes, ApiTags} from "@nestjs/swagger";
import {LocalAuthGuard} from "./local-auth.guard";
import {JwtAuthGuard} from "./jwt-auth.guard";
import {Observable} from "rxjs";

@Injectable()
export class FileExtender implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest();
        req.data["email"] = (req.body.email);
        req.data["password"] = (req.body.password);
        return next.handle();
    }
}

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
    login(@Request() req) {
        const {access_token} = this.authService.login(req.user);
        return {
            ...req.user,
            access_token
        };
    }


    @ApiBody({
        schema: {
            type: "object",
            properties: {
                token: {type: "string"},
            }
        }
    })
    @UseGuards(JwtAuthGuard)
    @Get("profile")
    getProfile(@Request() req) {
        return req.user;
    }
}