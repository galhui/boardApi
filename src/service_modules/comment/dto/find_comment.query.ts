import { ApiProperty } from "@nestjs/swagger";
import { PageReqeustBase } from "core/pagenation/page_request.base";

export class FindCommentQuery extends PageReqeustBase {
    @ApiProperty()
    boardIdx: number;
}