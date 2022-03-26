
import { paginate } from "nestjs-typeorm-paginate";
import { EntityRepository } from "typeorm";
import { BaseRepository } from "typeorm-transactional-cls-hooked";
import { Comment } from "../entities/comment.entity";

@EntityRepository(Comment)
export class CommentRepository extends BaseRepository<Comment> {
    async selectCommentOrderByBoard(boardIdx: number, parentCommetIdx?: number) {
        const queryBuilder = this.createQueryBuilder('cm')
            .where('cm.boardIdx = :boardIdx', { boardIdx })

        if (parentCommetIdx) {
            queryBuilder.leftJoinAndSelect('cm.comments', 'chm')
                .andWhere('cm.idx = :parentCommetIdx', { parentCommetIdx })
                .orderBy('chm.sort', 'DESC')
        } else {
            queryBuilder.andWhere('cm.parentIdx is null')
                .orderBy('cm.sort', 'DESC')
        }

        return await queryBuilder
            .limit(1)
            .getOne()
    }

    async insertCommnet(comment: Comment) {
        return this.createQueryBuilder()
            .insert()
            .values(comment)
            .execute()
    }

    async selectComment(idx: number) {
        return this.createQueryBuilder()
            .select()
            .where('idx = :idx', { idx })
            .getOne()
    }

    async selectComments(query: { page: number, limit: number, boardIdx: number }) {
        const queryBuilder = this.createQueryBuilder()
            .where('boardIdx = :boardIdx', { boardIdx: query.boardIdx})
            .orderBy('depth', 'ASC')
            .addOrderBy('sort', 'ASC')

        return await paginate(queryBuilder,{
            limit: query.limit,
            page: query.page
        })
    }
}