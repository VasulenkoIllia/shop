import { ApiProperty } from '@nestjs/swagger';

export class PagePaginationDto {

    @ApiProperty( {default:5})
    perPage: number;

    @ApiProperty({default:1})
    page:number;

}