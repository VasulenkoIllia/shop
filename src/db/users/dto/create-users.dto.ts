import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from '../users.entity';

export class CreateUsersDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ default: UserRole.USER })
  role: UserRole.USER | UserRole.ADMIN | UserRole.GHOST;
}
