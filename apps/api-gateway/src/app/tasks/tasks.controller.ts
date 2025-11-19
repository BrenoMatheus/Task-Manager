import { Controller, Get, Post, Body, Param, Patch, Delete, Req, UseGuards } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // -----------------------------------------------------
  // TASK CRUD
  // -----------------------------------------------------

  @Post()
  create(@Body() body: any, @Req() req) {
    return this.tasksService.create(
      {
        ...body,
        userId: req.user.sub, // agora vem do TOKEN
      },
      req.token
    );
  }

  @Get()
  findAll(@Req() req) {
    return this.tasksService.findAll(req.user.sub, req.token);
  }

  @Get(':id')
  findOne(@Param('id') id: string, @Req() req) {
    return this.tasksService.findOne(Number(id), req.token);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body: any, @Req() req) {
    return this.tasksService.update(Number(id), body, req.token);
  }

  @Delete(':id')
  delete(@Param('id') id: string, @Req() req) {
    return this.tasksService.delete(Number(id), req.token);
  }

  // -----------------------------------------------------
  // TASK COMMENTS
  // -----------------------------------------------------

  @Post(':taskId/comments')
  createComment(
    @Param('taskId') taskId: string,
    @Body() body: { userId: number; comment: string },
    @Req() req
  ) {
    return this.tasksService.createComment(Number(taskId), body, req.token);
  }

  @Get(':taskId/comments')
  getComments(@Param('taskId') taskId: string, @Req() req) {
    return this.tasksService.getComments(Number(taskId), req.token);
  }

  @Delete('comments/:commentId')
  deleteComment(@Param('commentId') commentId: string, @Req() req) {
    return this.tasksService.deleteComment(Number(commentId), req.token);
  }

  // -----------------------------------------------------
  // TASK USERS
  // -----------------------------------------------------

  @Post(':taskId/users/:userId')
  addUser(
    @Param('taskId') taskId: string,
    @Param('userId') userId: string,
    @Req() req
  ) {
    return this.tasksService.addUser(Number(taskId), Number(userId), req.token);
  }

  @Get(':taskId/users')
  getTaskUsers(@Param('taskId') taskId: string, @Req() req) {
    return this.tasksService.getTaskUsers(Number(taskId), req.token);
  }

  @Delete('/users/:id')
  removeUser(@Param('id') id: number, @Req() req) {
    return this.tasksService.removeUser(Number(id), req.token);
  }

  // -----------------------------------------------------
  // TASK HISTORY
  // -----------------------------------------------------

  @Get(':taskId/history')
  getHistory(@Param('taskId') taskId: string, @Req() req) {
    return this.tasksService.getHistory(Number(taskId), req.token);
  }
}
