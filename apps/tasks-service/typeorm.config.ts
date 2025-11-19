import { DataSource } from 'typeorm';
import { Task } from './src/app/task/task.entity';
import { Comment } from './src/app/task/comment/comment.entity';
import { History } from './src/app/task/history/history.entity';
import { TaskUser } from './src/app/task/TaskUser/user.entity';

export const AppDataSource = new DataSource({

  type: 'postgres',
  host: process.env.DB_HOST || 'db  ',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'challenge_db',
  entities: [
    Task,
    Comment,
    History,
    TaskUser,
  ],
  migrations: ['migrations/*.ts'],
  synchronize: false,
});

export default AppDataSource;
