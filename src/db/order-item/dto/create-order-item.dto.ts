import { ApiProperty } from "@nestjs/swagger";


export class CreateOrderItemDto {
  @ApiProperty()
  amount: number;

  @ApiProperty()
  itemId: number

}