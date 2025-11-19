import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TaskUserService } from './user.service';

@Controller()
export class TaskUserController {
  constructor(private readonly taskUserService: TaskUserService) {}

  @MessagePattern({ cmd: 'add_user_to_task' })
  addUser(@Payload() data: any) {
    return this.taskUserService.addUserToTask(data);
  }

  @MessagePattern({ cmd: 'get_task_users' })
  getUsers(@Payload() data: { taskId: number }) {
    return this.taskUserService.getUsersByTask(data.taskId);
  }

  @MessagePattern({ cmd: 'remove_user_from_task' })
  remove(@Payload() data: { id: number }) {
    return this.taskUserService.removeUser(data.id);
  }
}
