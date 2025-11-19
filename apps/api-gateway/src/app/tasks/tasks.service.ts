import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class TasksService {
  constructor(
    @Inject('TASKS_SERVICE') private readonly tasksClient: ClientProxy,
  ) {}

  // ---------------------------------------------
  // MÉTODO CENTRAL QUE INSERE O TOKEN AUTOMATICAMENTE
  // ---------------------------------------------
  private send(cmd: string, data: any, token: string) {
    return this.tasksClient.send(
      { cmd },
      { ...data, token }   // Token sempre é enviado
    );
  }

  // -----------------------------------------------------
  // TASK CRUD
  // -----------------------------------------------------

  create(data: any, token: string) {
    return this.send('create_task', data, token);
  }

  findAll(userId: number, token: string) {
    return this.send('get_all_tasks', { userId }, token);
  }

  findOne(id: number, token: string) {
    return this.send('find_task', { id }, token);
  }

  // ✔ CORRIGIDO — agora envia data e token separadamente
  update(id: number, data: any, token: string) {
    return this.send('update_task', { task: { id, ...data } }, token);
  }

  delete(id: number, token: string) {
    return this.send('delete_task', { id }, token);
  }

  // -----------------------------------------------------
  // TASK COMMENTS
  // -----------------------------------------------------

  createComment(taskId: number, data: any, token: string) {
    return this.send('create_task_comment', { taskId, ...data }, token);
  }

  getComments(taskId: number, token: string) {
    return this.send('get_task_comments', { taskId }, token);
  }

  deleteComment(commentId: number, token: string) {
    if (!commentId) {
      throw new Error("ID do comentário não definido");
    }
    return this.send('delete_task_comment', { commentId }, token);
  }

  // -----------------------------------------------------
  // TASK USERS
  // -----------------------------------------------------

  addUser(taskId: number, userId: number, token: string) {
    return this.send('add_user_to_task', { taskId, userId }, token);
  }

  getTaskUsers(taskId: number, token: string) {
    return this.send('get_task_users', { taskId }, token);
  }

  removeUser(id: number, token: string) {
    return this.send('remove_user_from_task', { id }, token);
  }

  // -----------------------------------------------------
  // TASK HISTORY
  // -----------------------------------------------------

  getHistory(taskId: number, token: string) {
    return this.send('get_task_history', { taskId }, token);
  }

}
