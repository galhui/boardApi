import { ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { PageResponseBase } from "core/pagenation/page_response.base";
import { DetailCommnetDto } from "./detail_comment.dto";

export class FindCommentResponse extends PageResponseBase {
    @ApiProperty({ type: [DetailCommnetDto], items: { type: 'array', items: { type: getSchemaPath(DetailCommnetDto) } } })
    comments: DetailCommnetDto[]
}