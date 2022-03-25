import { EntityRepository } from "typeorm";
import { BaseRepository } from "typeorm-transactional-cls-hooked";
import { Board } from "../entities/board.entity";

@EntityRepository(Board)
export class BoardRepository extends BaseRepository<Board> {
    
}