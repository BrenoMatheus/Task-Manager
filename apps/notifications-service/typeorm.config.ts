import { DataSource } from 'typeorm';
import { Notification } from 'src/app/notifications/notifications.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 5432,
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'password',
  database: process.env.DB_NAME || 'challenge_db',
  entities: [Notification],
  migrations: ['migrations/*.ts'],
  synchronize: false, // sempre false em produção
});
