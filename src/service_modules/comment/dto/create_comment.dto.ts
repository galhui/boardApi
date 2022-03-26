import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { Expose } from "class-transformer";
import { IsBase64, IsNumber, IsOptional, IsString } from "class-validator";
import { TransformPassword } from "core/tranform/common.trasform";

export class CreateCommentDto {
    @ApiProperty({ example: 'user1' })
    @IsString()
    @Expose()
    userName: string;

    @ApiProperty({ example: 'password' })
    @TransformPassword()
    @IsBase64()
    password: string;
    
    @ApiProperty({ example: '오늘의 맛집을 소개해봅니다. 치킨집, 김밥집..' })
    @IsString()
    @Expose()
    contents: string;

    @ApiProperty({ example: '1'})
    @IsNumber()
    @Expose()
    boardIdx: number;

    @ApiPropertyOptional({ example: '1'})
    @IsNumber()
    @IsOptional()
    @Expose()
    parentIdx?: number;
}
