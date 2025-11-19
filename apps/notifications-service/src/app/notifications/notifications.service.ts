import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notification } from './notifications.entity';

@Injectable()
export class NotificationsService {
  constructor(
    @InjectRepository(Notification)
    private readonly repository: Repository<Notification>,
  ) {}

  async create(data: Partial<Notification>) {
    const notif = this.repository.create(data);
    return this.repository.save(notif);
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
