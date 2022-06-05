import { ApiProperty } from "@nestjs/swagger";

export class CreateOrderDto {
  @ApiProperty()
  Status: string

  @ApiProperty()
  customerId: number
}