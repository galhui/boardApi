import { ApiProperty, OmitType } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsDate, IsNumber } from "class-validator";
import { CreateBoardDto } from "./create_board.dto";

export class DetailBoardDto extends OmitType(CreateBoardDto, ['password'] as const) {
    @ApiProperty()
    @IsNumber()
    @Expose()
    idx: number

    @ApiProperty()
    @IsDate()
    @Expose()
    regDate: Date

    @ApiProperty()
    @IsDate()
    @Expose()
    updDate: Date
}
