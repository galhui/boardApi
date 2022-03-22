import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { NoticeModule } from '../notice/notice.module';

@Module({
  imports: [NoticeModule],
  controllers: [CommentController],
  providers: [CommentService]
})
export class CommentModule {}
