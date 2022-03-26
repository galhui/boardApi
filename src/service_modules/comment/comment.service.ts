import { BadRequestException, Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { plainToClassExclude } from 'core/util/convert.util';
import { BoardRepository } from 'service_modules/board/repository/board.repository';
import { Propagation, Transactional } from 'typeorm-transactional-cls-hooked';
import { CreateCommentDto } from './dto/create_comment.dto';
import { DetailCommnetDto } from './dto/detail_comment.dto';
import { FindCommentQuery } from './dto/find_comment.query';
import { Comment } from './entities/comment.entity';
import { CommentRepository } from './repository/comment.repository';

@Injectable()
export class CommentService {

  constructor(
    readonly boardRepository: BoardRepository,
    readonly commentRepository: CommentRepository
  ) {

  }

  @Transactional({propagation: Propagation.REQUIRES_NEW })
  async create(dto: CreateCommentDto) {
    const board = await this.boardRepository.selectBoard(dto.boardIdx);

    if (!board) {
      throw new BadRequestException('존재하지 않는 게시글에 댓글을 등록하려합니다.');
    }

    interface CommentBaseInfo {
      path: string,
      sort: number
    }

    // basicInfo 찾아오기
    const depthComment = await this.commentRepository.selectCommentOrderByBoard(dto.boardIdx, dto.parentIdx);

    if ( dto.parentIdx && !depthComment) {
      throw new BadRequestException('존재하지 않는 부모 댓글입니다.');
    }

    const basicInfo: CommentBaseInfo = {
      sort: depthComment && depthComment.comments?.length > 0 ? depthComment.comments[0].sort + 1 :   // 자식커맨트 가장 마지막 커맨트의 sort + 1
            (depthComment && !dto.parentIdx ? depthComment.sort + 1 : 1),                             // 게시판 커맨트의 sort + 1, 커맨트 없으면 1
      path: ''
    }
    basicInfo.path = depthComment && dto.parentIdx ? depthComment.path + '-' + basicInfo.sort : basicInfo.sort.toString();
    const comment = plainToClass(Comment, { 
      ...basicInfo, 
      ...dto
    })

    const result = await this.commentRepository.insertCommnet(comment);

    return await this.findOne(result.identifiers[0].idx)
  }

  async findOne(idx: number) {
    const commnet = await this.commentRepository.selectComment(idx)
    return await plainToClassExclude(DetailCommnetDto, { ...commnet})
  }

  async findAll(query: FindCommentQuery) {
    const data = await this.commentRepository.selectComments(query)

    return {
        comments: await Promise.all(data.items.map(async(comment) => {
          return await plainToClassExclude(DetailCommnetDto, { ...comment})
        })),
        meta: data.meta
    }
  }
}
