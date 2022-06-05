import { ApiProperty } from "@nestjs/swagger";
import { CreateOrderItemDto } from "../../order-item/dto/create-order-item.dto";

export class CreateOrderDto {
  @ApiProperty({ default: "created" })
  status: string;

  @ApiProperty()
  customerId: number;

  @ApiProperty({type: CreateOrderItemDto, isArray: true})
  items: CreateOrderItemDto[]
}