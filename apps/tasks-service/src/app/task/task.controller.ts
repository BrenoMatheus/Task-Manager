// tasks-service/src/task/task.controller.ts
import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { TaskService } from './task.service';
import { JwtService } from '@nestjs/jwt';
import { TaskPriority, TaskStatus } from './task.enums';

export interface CreateTaskPayload {
  title: string;
  description?: string;
  userId: number; // Criador da tarefa
  dueDate?: Date; // Novo campo
  priority: TaskPriority; // Novo campo, use o Enum
  status: TaskStatus; // Novo campo, use o Enum
}

export interface UpdateTaskPayload {
  id: number; // ID da tarefa é obrigatório para atualização
  title?: string;
  description?: string;
  userId?: number; // Opcional, caso você queira reatribuir o criador
  dueDate?: Date;
  priority?: TaskPriority;
  status?: TaskStatus;
}

@Controller()
export class TaskController {
  constructor(
    private readonly taskService: TaskService,
    private readonly jwtService: JwtService
  ) {}

  private verifyToken(token: string) {
    try {
      const decoded = this.jwtService.verify(token);
      return decoded; // payload: { sub: userId, email, iat, exp }
    } catch (err) {
      throw new Error('Token inválido');
    }
  }

  @MessagePattern({ cmd: 'get_all_tasks' })
  getAllTasks(@Payload() data: { token: string }) {
    const payload = this.verifyToken(data.token);
    return this.taskService.getAllTasks(payload.sub);
  }

  @MessagePattern({ cmd: 'create_task' })
  createTask(@Payload() data: any) {

    const payload = this.verifyToken(data.token);
    const { token, ...taskData } = data; // remove o token e deixa só a task

    return this.taskService.createTask({
      ...taskData,
      userId: payload.sub,
    });
  }

  @MessagePattern({ cmd: 'update_task' })
  updateTask(@Payload() data: { token: string; userId: number; task: UpdateTaskPayload }) {
    const payload = this.verifyToken(data.token);
    return this.taskService.updateTask(payload.sub, data.task.id, data.task);
  }

  @MessagePattern({ cmd: 'delete_task' })
  deleteTask(@Payload() data: { token: string; id: number }) {
    const payload = this.verifyToken(data.token);
    return this.taskService.deleteTask(payload.sub, data.id);
  }

}
