import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { Task } from './task.entity';
import { CreateTaskPayload, UpdateTaskPayload } from './task.controller';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    
    @Inject('NOTIFICATIONS_SERVICE')
    private readonly notificationClient: ClientProxy,

    @Inject('AUTH_SERVICE')
    private readonly authClient: ClientProxy,
  ) {}

  async getAllTasks(userId: number) {
    const [tasks, users] = await Promise.all([
      this.taskRepository.find({
        where: { userId },
        relations: ['assignedUsers'], 
        order: { dueDate: 'DESC' },
      }),

      // pega apenas id + name, rápido!
      firstValueFrom(
        this.authClient.send({ cmd: 'get_all_users' }, {})
      ),
    ]);

    const usersMap = new Map(users.map(u => [u.id, u.name]));

    return tasks.map(task => ({
      ...task,
      assignedUsers: task.assignedUsers.map(rel => ({
        id: rel.id,
        userId: rel.userId,
        userName: usersMap.get(rel.userId) ?? 'Usuário não encontrado',
      })),
    }));
  }

  async createTask(data: CreateTaskPayload) {
    const task = this.taskRepository.create(data);
    const saved = await this.taskRepository.save(task);

    // 👇 dispara o evento para o microserviço de notificações
    this.notificationClient.emit('task_created', {
      userId: data.userId,
      taskId: saved.id,
      title: data.title,
    });

    return saved;
  }

  async findTask(id: number) {
    return this.taskRepository.findOne({ where: { id } });
  }

  async updateTask(userId: number, id: number, updateData: Omit<UpdateTaskPayload, 'id'>) {
    const updateResult = await this.taskRepository.update(id, updateData); 
    
    if (updateResult.affected === 0) {
        throw new Error(`Task with ID ${id} not found.`);
    }

    const saved = await this.taskRepository.findOne({ where: { id } });

    if (!saved) {
      throw new Error('Task not found after update.'); // Caso muito improvável.
    }

    this.notificationClient.emit('task_updated', {
      userId, 
      taskId: saved.id,
      title: saved.title,
      status: saved.status, 
    });

    return saved;
  }

  async deleteTask(userId: number, id: number) {
    const task = await this.taskRepository.findOne({ where: { id } });
    if (!task) throw new Error('Task not found');

    await this.taskRepository.delete(id);

    // 🔥 Evento: tarefa removida
    this.notificationClient.emit('task_deleted', {
      userId,
      taskId: task.id,
      title: task.title,
    });

    return { deleted: true };
  }

}
