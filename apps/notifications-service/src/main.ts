import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { Transport } from '@nestjs/microservices';
import { IoAdapter } from '@nestjs/platform-socket.io';

async function bootstrap() {
  // 1️⃣ Cria app HTTP normal (para WebSocket)
  const app = await NestFactory.create(AppModule);

  // Habilita CORS pro frontend
  app.enableCors({
    origin: '*',
    credentials: true,
  });

  /* app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  }); */

  // Habilita socket.io
  app.useWebSocketAdapter(new IoAdapter(app));

  // 2️⃣ Conecta o microserviço RMQ junto
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL || 'amqp://admin:admin@rabbitmq:5672'],
      queue: 'notifications_queue',
      queueOptions: { durable: false },
    },
  });

  await app.startAllMicroservices();
  await app.listen(3004);

  console.log('🚀 Notifications Service: HTTP + WebSocket + RMQ ativo na porta 3004');
}

bootstrap();
