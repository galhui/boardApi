import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { plainToClassExclude } from 'core/util/convert.util';
import { NotifyType } from 'service_modules/notice/enum/notice.enum';
import { NoticeService } from 'service_modules/notice/notice.service';
import { Propagation, Transactional } from 'typeorm-transactional-cls-hooked';
import { CreateBoardDto } from './dto/create_board.dto';
import { DetailBoardDto } from './dto/detail_board.dto';
import { FindBoardQuery } from './dto/find_board.query';
import { UpdateBoardDto } from './dto/update_board.dto';
import { Board } from './entities/board.entity';
import { BoardRepository } from './repository/board.repository';
//import Mecab from '../../core/mecab/mecab.module';

@Injectable()
export class BoardService {
  constructor(
    private readonly boardRepository: BoardRepository,
    private readonly noticeService: NoticeService
  ) {

  }

  @Transactional({propagation: Propagation.REQUIRES_NEW })
  async create(dto: CreateBoardDto) {
    // todo. board title, contents에 대해 keyword를 추출해서 함께 저장해준다.

    const result = await this.boardRepository.insertBoard(plainToClass(Board, { ...dto }))
    const boardIdx = result.identifiers[0].idx
    
    const mecab = require('mecab-ya');

    mecab.nouns(dto.title + '\n' + dto.contents, async (err:any, items:string[]) => {
      await this.boardRepository.updateBoardKeyword(boardIdx, items)
      await this.noticeService.sendNotify(NotifyType.BOARD, items, boardIdx)
    })

    return await this.findOne(boardIdx)
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

    // todo. board title, contents에 대해 keyword를 추출해서 갱신한다
    await this.boardRepository.updateBoard(id, plainToClass(Board, { ...dto }))

    // questions. 알림을 다시 보낼 필요가 있을까?
    return await this.findOne(id)
  }

  async remove(id: number) {
    await this.boardRepository.deleteBoard(id);
  }
}
