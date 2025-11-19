import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { NotificationsService } from './notifications.service';

@Controller()
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  // 🔥 Tarefa criada
  @EventPattern('task_created')
  async handleTaskCreated(@Payload() data: any) {
    console.log('📩 Evento: task_created', data);

    await this.notificationsService.create({
      userId: data.userId,
      type: 'task_created',
      message: `Nova tarefa criada: ${data.title}`,
      taskId: data.taskId,
    });
  }

  // 🔥 Tarefa atualizada
  @EventPattern('task_updated')
  async handleTaskUpdated(@Payload() data: any) {
    console.log('📩 Evento: task_updated', data);

    await this.notificationsService.create({
      userId: data.userId,
      type: 'task_updated',
      message: `Tarefa atualizada: ${data.title}`,
      taskId: data.taskId,
    });
  }

  // 🔥 Tarefa deletada
  @EventPattern('task_deleted')
  async handleTaskDeleted(@Payload() data: any) {
    console.log('📩 Evento: task_deleted', data);

    await this.notificationsService.create({
      userId: data.userId,
      type: 'task_deleted',
      message: `A tarefa "${data.title}" foi deletada`,
      taskId: data.taskId,
    });
  }

  // 🔥 Tarefa alternou status (toggle)
  @EventPattern('task_toggled')
  async handleTaskToggled(@Payload() data: any) {
    console.log('📩 Evento: task_toggled', data);

    const status = data.completed ? 'completada' : 'em andamento';

    await this.notificationsService.create({
      userId: data.userId,
      type: 'task_toggled',
      message: `A tarefa "${data.title}" agora está ${status}`,
      taskId: data.taskId,
    });
  }

  // 🔥 Comentário na tarefa
  @EventPattern('task_commented')
  async handleTaskCommented(@Payload() data: any) {
    console.log('📩 Evento: task_commented', data);

    await this.notificationsService.create({
      userId: data.userId,
      type: 'task_commented',
      message: `Novo comentário na tarefa: ${data.title}`,
      taskId: data.taskId,
    });
  }

  // 📌 Buscar notificações do usuário (Request/Response)
  @MessagePattern({ cmd: 'get_user_notifications' })
  async getUserNotifications(@Payload() data: { userId: number }) {
    return this.notificationsService.getUserNotifications(data.userId);
  }

  // 📌 Marcar notificação como lida
  @MessagePattern({ cmd: 'mark_notification_read' })
  async markAsRead(@Payload() data: { id: number }) {
    return this.notificationsService.markAsRead(data.id);
  }
}
