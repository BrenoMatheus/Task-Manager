import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.RMQ,
      options: {
        urls: [process.env.RABBITMQ_URL || 'amqp://admin:admin@rabbitmq:5672'],
        queue: 'tasks_queue',
        queueOptions: { durable: false },
      },
    },
  );

  await app.listen();
  console.log('🚀 Task Service is listening for RMQ messages...');
}
bootstrap();