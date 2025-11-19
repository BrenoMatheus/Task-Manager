import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  CreateDateColumn,
  Unique,
} from 'typeorm';
import { Task } from '../task.entity';

@Entity('task_users')
@Unique(['taskId', 'userId'])

export class TaskUser {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  taskId: number;

  @Column()
  userId: number;

  @CreateDateColumn()
  assignedAt: Date;

  @ManyToOne(() => Task, (task) => task.assignedUsers, { onDelete: 'CASCADE' })
  task: Task;
  
}
