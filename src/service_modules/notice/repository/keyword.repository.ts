
import { EntityRepository } from "typeorm";
import { BaseRepository } from "typeorm-transactional-cls-hooked";
import { Keyword } from "../entities/keyword.entity";

@EntityRepository(Keyword)
export class KeywordRepository extends BaseRepository<Keyword> {
    async selectUserByKeyword(keywords: string[]) {
        return await this.createQueryBuilder()
            .where('keyword in (:keyword)', { keyword: keywords })
            .getMany()
    }
}