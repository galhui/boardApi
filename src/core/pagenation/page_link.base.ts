import { ApiProperty } from '@nestjs/swagger'
import { IPaginationLinks } from 'nestjs-typeorm-paginate'

export class PagenationLinks implements IPaginationLinks {
    @ApiProperty()
    readonly first?: string

    @ApiProperty()
    readonly previous?: string

    @ApiProperty()
    readonly next?: string

    @ApiProperty()
    readonly last?: string
}
