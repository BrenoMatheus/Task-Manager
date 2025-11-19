import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TaskModule } from './task/task.module';
import { Task } from './task/task.entity';
import { CommentModule } from './task/comment/comment.module';
import { HistoryModule } from './task/history/history.module';
import { TaskUserModule } from './task/TaskUser/user.module';
import { Comment } from './task/comment/comment.entity';
import { History } from './task/history/history.entity';
import { TaskUser } from './task/TaskUser/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST || 'db',
      port: Number(process.env.DB_PORT || 5432),
      username: process.env.DB_USER || 'postgres',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'challenge_db',
      entities: [Task, Comment, History, TaskUser],
      synchronize: true,
    }),

    TaskModule, // <-- AGORA sim o TaskController será carregado!
    CommentModule,
    HistoryModule,
    TaskUserModule,

  ],
})
export class AppModule {}
