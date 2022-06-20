import {Injectable} from "@nestjs/common";
import {UsersService} from "../users/users.service";
import {HelpersService} from "../helpers/helpers.service";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {
    }

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.findByEmail(email);
        if (await HelpersService.checkHashData(user.password, password)) {
            const {password, ...result} = user;
            return result;
        }
        return null;
    }

    login(user: any) {
        const payload = {email: user.email, sub: user.id};
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}