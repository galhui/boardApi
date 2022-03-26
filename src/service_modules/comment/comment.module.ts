import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { NoticeModule } from '../notice/notice.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentRepository } from './repository/comment.repository';
import { BoardRepository } from 'service_modules/board/repository/board.repository';

@Module({
  imports: [
    NoticeModule,
    TypeOrmModule.forFeature([
      BoardRepository,
      CommentRepository
    ])
  ],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
