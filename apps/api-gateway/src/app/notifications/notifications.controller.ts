import { Controller, Get, Param, Patch, Headers } from '@nestjs/common';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  // -----------------------------------------------------
  // LISTAR NOTIFICAÇÕES DO USUÁRIO
  // -----------------------------------------------------
  @Get('user/:userId')
  async getUserNotifications(
    @Param('userId') userId: number,
    @Headers('authorization') authorization: string
  ) {
    const token = authorization?.replace('Bearer ', '');
    if (!token) throw new Error('Token ausente');

    return this.notificationsService.getUserNotifications(userId, token);
  }

  // -----------------------------------------------------
  // MARCAR NOTIFICAÇÃO COMO LIDA
  // -----------------------------------------------------
  @Patch('read/:id')
  async markAsRead(
    @Param('id') id: number,
    @Headers('authorization') authorization: string
  ) {
    const token = authorization?.replace('Bearer ', '');
    if (!token) throw new Error('Token ausente');

    return this.notificationsService.markAsRead(id, token);
  }
}
