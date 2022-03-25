import { ApiProperty, getSchemaPath } from "@nestjs/swagger";
import { PageResponseBase } from "core/pagenation/page_response.base";
import { DetailBoardDto } from "./detail_board.dto";

export class FindBoardResponse extends PageResponseBase {
    @ApiProperty({ type: [DetailBoardDto], items: { type: 'array', items: { type: getSchemaPath(DetailBoardDto) } } })
    boards: DetailBoardDto[]
}