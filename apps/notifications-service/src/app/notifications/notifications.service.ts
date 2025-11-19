import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notifications.entity';
import { NotificationsGateway } from './notifications.gateway';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly repository: Repository<Notification>,
    private readonly gateway: NotificationsGateway

  ) {}

  async create(data: Partial<Notification>) {
    const notif = this.repository.create(data);
    const saved = await this.repository.save(notif);

    // 💥 (Novo) emitir para WebSocket
    this.gateway.sendNotification(saved);

    return saved;
  }


  async markAsRead(id: number) {
    await this.repository.update(id, { read: true });
    return this.repository.findOne({ where: { id } });
  }

  async getUserNotifications(userId: number) {
    return this.repository.find({
      where: { 
        userId,
        read: false,
       },
      order: { createdAt: 'DESC' },
    });
  }
}
