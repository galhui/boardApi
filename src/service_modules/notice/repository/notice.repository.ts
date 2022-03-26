
import { EntityRepository } from "typeorm";
import { BaseRepository } from "typeorm-transactional-cls-hooked";
import { Notice } from "../entities/notice.entity";

@EntityRepository(Notice)
export class NoticeRepository extends BaseRepository<Notice> {
    async insertNotice(notice: Notice[]) {
        return await this.createQueryBuilder()
            .insert()
            .values(notice)
            .execute()
    }
}