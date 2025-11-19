import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskUser } from './user.entity';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class TaskUserService {
  constructor(
    @InjectRepository(TaskUser)
    private readonly taskUserRepository: Repository<TaskUser>,
    
    @Inject('AUTH_SERVICE')
    private readonly authClient: ClientProxy,

  ) {}

  async addUserToTask(data: { taskId: number; userId: number }) {
    // Verifica se já existe
    const exists = await this.taskUserRepository.findOne({
      where: { taskId: data.taskId, userId: data.userId },
    });

    if (exists) {
      return {
        error: true,
        message: 'Usuário já está atribuído a esta tarefa.',
      };
    }

    // Se não existir, cria
    const relation = this.taskUserRepository.create(data);
    return this.taskUserRepository.save(relation);
  }


  async getUsersByTask(taskId: number) {
    const relations = await this.taskUserRepository.find({
      where: { taskId },
      order: { assignedAt: { direction: 'ASC' } },
    });

    const users = await Promise.all(
      relations.map(async (relation) => {
        const user = await firstValueFrom(
          this.authClient.send(
            { cmd: 'get_user_by_id' },
            { id: relation.userId },
          )
        ).catch(() => null); // <-- evita crash caso o auth service falhe

        // Caso venha null ou incompleto
        const safeUserName = user?.name ?? 'Usuário não encontrado';

        return {
          ...relation,
          userName: safeUserName,
        };
      }),
    );

    return users;
  }



  async removeUser(id: number) {
    await this.taskUserRepository.delete(id);
    return { deleted: true };
  }
}
