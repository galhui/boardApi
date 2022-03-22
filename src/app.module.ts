import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CommentModule } from './comment/comment.module';
import { BoardModule } from './board/board.module';

@Module({
  imports: [CommentModule, BoardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
