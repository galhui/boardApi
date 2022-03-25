import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { plainToClassExclude } from 'core/util/convert.util';
import { Propagation, Transactional } from 'typeorm-transactional-cls-hooked';
import { CreateBoardDto } from './dto/create_board.dto';
import { DetailBoardDto } from './dto/detail_board.dto';
import { FindBoardQuery } from './dto/find_board.query';
import { FindBoardResponse } from './dto/find_board.response';
import { UpdateBoardDto } from './dto/update_board.dto';
import { Board } from './entities/board.entity';
import { BoardRepository } from './repository/board.repository';

@Injectable()
export class BoardService {
  constructor(
    readonly boardRepository: BoardRepository
  ) {

  }

  @Transactional({propagation: Propagation.REQUIRES_NEW })
  async create(dto: CreateBoardDto) {
    const result = await this.boardRepository.insertBoard(plainToClass(Board, { ...dto }))

    return await this.findOne(result.identifiers[0].idx)
  }

  async findAll(query: FindBoardQuery) {
    const data = await this.boardRepository.selectBoards(query) 
    return { 
      boards: await Promise.all(data.items.map(async (b) => {
        return await plainToClassExclude(DetailBoardDto, { ...b })
      })),
      meta: data.meta
    }
  }

  async findOne(id: number) {
    const board = await this.boardRepository.selectBoard(id)
    return await plainToClassExclude(DetailBoardDto, { ...board })
  }

  async update(id: number, dto: UpdateBoardDto) {
    const board = await this.boardRepository.selectBoard(id)

    if (!board) throw new BadRequestException('삭제된 게시글을 수정하려 합니다.')
    if (board.userName !== dto.userName || board.password !== dto.password) {
      throw new UnauthorizedException('사용자 정보가 틀립니다.')
    }
    await this.boardRepository.updateBoard(id, plainToClass(Board, { ...dto }))
    return await this.findOne(id)
  }

  async remove(id: number) {
    await this.boardRepository.deleteBoard(id);
  }
}
