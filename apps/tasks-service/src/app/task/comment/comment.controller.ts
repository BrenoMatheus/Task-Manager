import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CommentService } from './comment.service';

@Controller()
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @MessagePattern({ cmd: 'create_task_comment' })
  createComment(@Payload() data: { taskId: number; userId: number; content: string }) {
    return this.commentService.createComment(data);
  }

  @MessagePattern({ cmd: 'get_task_comments' })
  getComments(@Payload() data: { taskId: number }) {
    return this.commentService.getCommentsByTask(data.taskId);
  }

  @MessagePattern({ cmd: 'delete_task_comment' })
  deleteComment(@Payload() data: { commentId: number }) {
    return this.commentService.deleteComment(data.commentId);
  }
}
