import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AuthModule } from './auth/auth.module';
import { TasksModule } from './tasks/tasks.module'; // 👈 novo módulo
import { NotificationsModule } from './notifications/notifications.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),

    // 🟦 Registro dos microservices
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://admin:admin@rabbitmq:5672'],
          queue: 'auth_queue',
          queueOptions: { durable: false },
        },
      },
      {
        name: 'TASKS_SERVICE', // 👈 novo serviço
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://admin:admin@rabbitmq:5672'],
          queue: 'task_queue',
          queueOptions: { durable: false },
        },
      },
      {
        name: 'NOTIFICATIONS_SERVICE', // 👈 novo serviço
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://admin:admin@rabbitmq:5672'],
          queue: 'notifications_queue',
          queueOptions: { durable: false },
        },
      },
    ]),

    // 🟨 Módulos locais
    AuthModule,
    TasksModule, 
    NotificationsModule,
  ],
})
export class AppModule {}
