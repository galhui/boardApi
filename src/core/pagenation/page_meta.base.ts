import { ApiProperty } from '@nestjs/swagger'
import { IPaginationMeta } from 'nestjs-typeorm-paginate'

export class PaginationMeta implements IPaginationMeta {
    @ApiProperty()
    readonly itemCount!: number

    @ApiProperty()
    readonly totalItems?: number

    @ApiProperty()
    readonly itemsPerPage!: number

    @ApiProperty()
    readonly totalPages?: number

    @ApiProperty()
    readonly currentPage!: number
}
