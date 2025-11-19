import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class NotificationsService {
  constructor(
    @Inject('NOTIFICATIONS_SERVICE') private readonly client: ClientProxy
  ) {}

  // ---------------------------------------------
  // MÉTODO CENTRAL QUE INSERE O TOKEN AUTOMATICAMENTE
  // ---------------------------------------------
  private send(cmd: string, data: any, token: string) {
    return this.client.send(
      { cmd },
      { ...data, token }   // token SEMPRE enviado
    );
  }

  // ---------------------------------------------
  // NOTIFICAÇÕES
  // ---------------------------------------------

  async getUserNotifications(userId: number, token: string) {
    return this.send('get_user_notifications', { userId }, token);
  }

  async markAsRead(id: number, token: string) {
    return this.send('mark_notification_read', { id }, token);
  }
}
