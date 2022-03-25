
import { EntityRepository } from "typeorm";
import { BaseRepository } from "typeorm-transactional-cls-hooked";
import { Keyword } from "../entities/keyword.entity";

@EntityRepository(Keyword)
export class KeywordRepository extends BaseRepository<Keyword> {

}