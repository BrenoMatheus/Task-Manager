import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({
  namespace: '/notifications',
  cors: { origin: '*' },
})
export class NotificationsGateway {
  @WebSocketServer()
  server: Server;

  // Evento que envia uma nova notificação para todos os clientes conectados
  sendNotification(notification: any) {
    this.server.emit('notification', notification);
  }

  // Exemplo: receber mensagem do cliente
  @SubscribeMessage('clientMessage')
  handleMessage(@MessageBody() message: string) {
    console.log('Mensagem do cliente:', message);
    return { message: 'Mensagem recebida pelo servidor!' };
  }
}
