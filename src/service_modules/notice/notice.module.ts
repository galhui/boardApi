import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from 'service_modules/board/repository/board.repository';
import { NoticeService } from './notice.service';
import { KeywordRepository } from './repository/keyword.repository';
import { NoticeRepository } from './repository/notice.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      NoticeRepository,
      KeywordRepository,
      BoardRepository
    ])
  ],
  providers: [NoticeService],
  exports: [NoticeService]
})
export class NoticeModule {}
