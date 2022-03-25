import { ApiProperty } from "@nestjs/swagger"
import { Expose } from "class-transformer"
import { PagenationLinks } from "./page_link.base"
import { PaginationMeta } from "./page_meta.base"

export class PageResponseBase {
    @ApiProperty()
    @Expose()
    readonly meta! : PaginationMeta

    // @ApiProperty()
    // @Expose()
    // readonly link! : PagenationLinks
}