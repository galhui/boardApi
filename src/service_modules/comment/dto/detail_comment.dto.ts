import { ApiProperty, ApiPropertyOptional, OmitType } from "@nestjs/swagger"
import { Expose } from "class-transformer"
import { IsDate, IsNumber } from "class-validator"
import { CreateCommentDto } from "./create_comment.dto"

export class DetailCommnetDto extends OmitType(CreateCommentDto, ['password'] as const) {
    @ApiProperty()
    @IsNumber()
    @Expose()
    idx: number

    @ApiProperty()
    @IsDate()
    @Expose()
    regDate: Date

    @ApiProperty()
    @IsNumber()
    @Expose()
    depth: number
    
    @ApiProperty()
    @IsNumber()
    @Expose()
    sort: number
}