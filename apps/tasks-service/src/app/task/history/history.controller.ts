import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { HistoryService } from './history.service';

@Controller()
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @MessagePattern({ cmd: 'create_history' })
  create(@Payload() data: any) {
    return this.historyService.create(data);
  }

  @MessagePattern({ cmd: 'get_task_history' })
  findByTask(@Payload() data: { taskId: number }) {
    return this.historyService.findByTask(data.taskId);
  }

  @MessagePattern({ cmd: 'delete_history' })
  delete(@Payload() data: { id: number }) {
    return this.historyService.delete(data.id);
  }
}
