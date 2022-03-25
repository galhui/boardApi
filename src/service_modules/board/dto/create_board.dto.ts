import { ApiProperty } from "@nestjs/swagger";
import { TransformPassword } from "core/tranform/common.trasform";
import { IsString, IsBase64 } from "class-validator";
import { Expose } from "class-transformer";

export class CreateBoardDto {
    @ApiProperty({ example: 'user1' })
    @IsString()
    @Expose()
    userName: string;

    @ApiProperty({ example: 'password' })
    @TransformPassword()
    @IsBase64()
    password: string;
    
    @ApiProperty({ example: '게시글을 작성해봅니다. '})
    @IsString()
    @Expose()
    title: string;

    @ApiProperty({ example: '오늘의 맛집을 소개해봅니다. 치킨집, 김밥집..' })
    @IsString()
    @Expose()
    contents: string;
}
