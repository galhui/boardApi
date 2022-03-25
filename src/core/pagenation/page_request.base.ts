import { ApiProperty } from "@nestjs/swagger"
import { Type } from "class-transformer"

export class PageReqeustBase {
    @ApiProperty({ example: 10 })
    @Type(() => Number)
    readonly limit: number = 10
  
    @ApiProperty({ example: 1 })
    @Type(() => Number)
    readonly page: number = 1
  }
  