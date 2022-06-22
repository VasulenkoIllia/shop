import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/db/roles/role.enum';

export class CreateUsersDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;

  @ApiProperty({ default: Role.User })
  roles: Role[] ;
}
