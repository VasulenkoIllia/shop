import {ApiProperty} from '@nestjs/swagger';

export class CreateCustomerDto {
    @ApiProperty()
    name: string;
    @ApiProperty()
    phone: string;
    @ApiProperty()
    address: string;
    @ApiProperty()
    description: string;
}
