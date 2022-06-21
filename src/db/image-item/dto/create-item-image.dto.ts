import { ApiProperty } from '@nestjs/swagger';

export class CreateItemImageDto {
  @ApiProperty()
  path: string;

  @ApiProperty()
  itemId: number;
}
