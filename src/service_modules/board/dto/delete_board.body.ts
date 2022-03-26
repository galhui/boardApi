import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsBase64, IsString } from "class-validator";
import { TransformPassword } from "core/tranform/common.trasform";

export class DeleteBoardBody {
    @ApiProperty({ example: 'user1' })
    @IsString()
    @Expose()
    userName: string;

    @ApiProperty({ example: 'password' })
    @TransformPassword()
    @IsBase64()
    password: string;
}