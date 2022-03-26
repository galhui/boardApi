import { paginate } from "nestjs-typeorm-paginate";
import { EntityRepository } from "typeorm";
import { BaseRepository } from "typeorm-transactional-cls-hooked";
import { Board } from "../entities/board.entity";

@EntityRepository(Board)
export class BoardRepository extends BaseRepository<Board> {
    // 서비스에서 entity로 바로 save()나 delete()해도 되지만.. Data access layer를 repository로 사용하여, 쿼리들 한곳에 모으자
    
    async insertBoard(board: Board) {
        return await this.createQueryBuilder()
            .insert()
            .values(board)
            .execute()
    }

    async selectBoard(idx: number) {
        return await this.createQueryBuilder()
            .select()
            .where('idx = :idx', { idx })
            .andWhere('isDel = 0')
            .getOne()
    }

    async selectBoards(query: { page: number, limit: number, title?:string, userName?:string}) {
        const queryBuilder = await this.createQueryBuilder()
            .where('isDel = 0')
        
        if (query.title) {
            queryBuilder.andWhere('title like :title', { title : `%${query.title}%` })
        }

        if (query.userName) {
            queryBuilder.andWhere('userName = :userName', { userName : query.userName})
        }

        return await paginate(queryBuilder,{
            limit: query.limit,
            page: query.page
        })
    }

    async deleteBoard (idx: number) {
        return await this.createQueryBuilder()
            .update()
            .set({isDel : 1 })
            .where('idx = :idx', { idx: idx })
            .execute()
    }

    async updateBoard (idx: number, board: Board) {
        return await this.createQueryBuilder()
            .update()
            .set({ contents: board.contents, title: board.title })
            .where('idx = :idx', { idx: idx })
            .execute()
    }

    async updateBoardKeyword (idx: number, keywords: string[]) {
        return await this.createQueryBuilder()
            .update()
            .set({ keyword: { key : keywords } })
            .where('idx = :idx', { idx: idx })
            .execute()
    }
}