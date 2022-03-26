import { Injectable } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { BoardRepository } from 'service_modules/board/repository/board.repository';
import { Propagation, Transactional } from 'typeorm-transactional-cls-hooked';
import { Notice } from './entities/notice.entity';
import { NotifyType } from './enum/notice.enum';
import { KeywordRepository } from './repository/keyword.repository';
import { NoticeRepository } from './repository/notice.repository';

@Injectable()
export class NoticeService {
    constructor(
        private readonly noticeRepository: NoticeRepository,
        private readonly keywordRepository: KeywordRepository,
        private readonly boardRepository: BoardRepository
    ) {}

    @Transactional({ propagation: Propagation.REQUIRES_NEW})
    async sendNotify(type: NotifyType, keywords: string[],  boardIdx:number, commentIdx?:number) {
        if (keywords.length === 0) return
        
        const board = await this.boardRepository.selectBoard(boardIdx)
        const users = await this.keywordRepository.selectUserByKeyword(keywords)

        const notice = users.map((u) => {
            return plainToClass(Notice, {
                userName: u.userName,
                contents:`${u.userName} 고객님이 등록하신 '${u.keyword}' 키워드와 연관된 신규 등록 ${type === NotifyType.BOARD? '게시글':'댓글'}이 있습니다. 확인하려면 클릭해주세요.`,
                targetUrl: `/board/${boardIdx}${commentIdx ? `#comment-${commentIdx}`: '' }`,
            })
        })

        await this.noticeRepository.insertNotice(notice)
    }
}
