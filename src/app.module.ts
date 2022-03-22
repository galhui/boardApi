import { Module } from '@nestjs/common';
import { CommentModule } from './service_modules/comment/comment.module';
import { BoardModule } from './service_modules/board/board.module';
import { DbModule } from './core/db/db.module';
import { ConfigLoadModule } from './core/config/config_load.module';

@Module({
  imports: [
    // core 
    DbModule, 
    ConfigLoadModule,

    // service
    CommentModule, 
    BoardModule    
  ]
})
export class AppModule {}
