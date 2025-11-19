import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { TaskUserController } from './user.controller';
import { TaskUserService } from './user.service';
import { TaskUser } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskUser]),

    // 🔥 Registrar os microservices necessários
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
        name: 'NOTIFICATIONS_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: [process.env.RABBITMQ_URL || 'amqp://admin:admin@rabbitmq:5672'],
          queue: 'notifications_queue',
          queueOptions: { durable: false },
        },
      },
    ]),
  ],
  controllers: [TaskUserController],
  providers: [TaskUserService],
})
export class TaskUserModule {}
