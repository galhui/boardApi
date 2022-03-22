import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { CommentModule } from './service_modules/comment/comment.module';
import { BoardModule } from './service_modules/board/board.module';
import { DbModule } from './core/db/db.module';
import configuration from './core/config/configuration';

@Module({
  imports: [
    // core 
    ConfigModule.forRoot({
        load: [configuration]
    }),
    DbModule, 
    
    // service
    CommentModule, 
    BoardModule    
  ]
})
export class AppModule {}
