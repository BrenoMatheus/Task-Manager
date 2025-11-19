import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { History } from './history.entity';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private readonly historyRepository: Repository<History>,
  ) {}

  async create(data: any) {
    const history = this.historyRepository.create(data);
    return this.historyRepository.save(history);
  }

  async findByTask(taskId: number) {
    return this.historyRepository.find({
      where: { taskId },
      order: { createdAt: 'DESC' },
    });
  }

  async delete(id: number) {
    await this.historyRepository.delete(id);
    return { deleted: true };
  }
}
