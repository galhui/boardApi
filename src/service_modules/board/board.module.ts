import { forwardRef, Module } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardController } from './board.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardRepository } from './repository/board.repository';
import { NoticeModule } from 'service_modules/notice/notice.module';

@Module({
  imports:[
    TypeOrmModule.forFeature([
      BoardRepository
    ]),
    forwardRef(() => NoticeModule)
  ],
  controllers: [BoardController],
  providers: [BoardService]
})
export class BoardModule {}
