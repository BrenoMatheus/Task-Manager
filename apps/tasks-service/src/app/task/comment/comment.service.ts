import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comment } from './comment.entity';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private readonly commentRepo: Repository<Comment>,
  ) {}

  async createComment(data: { taskId: number; userId: number; content: string }) {
    const comment = this.commentRepo.create(data);
    return this.commentRepo.save(comment);
  }

  async getCommentsByTask(taskId: number) {
    return this.commentRepo.find({
      where: { taskId },
      order: { createdAt: 'ASC' },
    });
  }

  async deleteComment(id: number) {
    const comment = await this.commentRepo.findOne({ where: { id } });
    if (!comment) throw new Error('Comment not found');

    await this.commentRepo.delete(id);

    return { deleted: true };
  }
}
