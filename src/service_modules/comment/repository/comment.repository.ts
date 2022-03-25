
import { EntityRepository } from "typeorm";
import { BaseRepository } from "typeorm-transactional-cls-hooked";
import { Comment } from "../entities/comment.entity";

@EntityRepository(Comment)
export class CommentRepository extends BaseRepository<Comment> {
    
}