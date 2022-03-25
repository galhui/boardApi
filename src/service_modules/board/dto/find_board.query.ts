import { ApiPropertyOptional } from "@nestjs/swagger"
import { PageReqeustBase } from "core/pagenation/page_request.base"

export class FindBoardQuery extends PageReqeustBase {
    @ApiPropertyOptional()
    title?: string

    @ApiPropertyOptional()
    userName?: string
}