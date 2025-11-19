import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  cors: { origin: '*' },
})
export class NotificationsGateway {
  @WebSocketServer()
  server: Server;

  sendNotification(userId: number, notification: any) {
    this.server.to(`user_${userId}`).emit('notification', notification);
  }

  handleConnection(socket: any) {
    const userId = Number(socket.handshake.query.userId);

    if (userId) {
      socket.join(`user_${userId}`);
      console.log(`🔗 Usuário conectado ao canal user_${userId}`);
    }
  }
}
