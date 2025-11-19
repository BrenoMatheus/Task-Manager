import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { TaskUser } from './TaskUser/user.entity';
import { History } from './history/history.entity';
import { Comment } from './comment/comment.entity';
import { TaskPriority, TaskStatus } from './task.enums';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Column({ type: 'date', nullable: true })
  dueDate: Date; 

  @Column({
    type: 'enum',
    enum: TaskPriority,
    default: TaskPriority.MEDIUM, // Prioridade padrão
  })
  priority: TaskPriority; // Prioridade (LOW, MEDIUM, HIGH, URGENT)

  @Column({
    type: 'enum',
    enum: TaskStatus,
    default: TaskStatus.TODO, // Status padrão ao criar
  })
  status: TaskStatus; // Status (TODO, IN_PROGRESS, REVIEW, DONE)

  @Column()
  userId: number;

  @OneToMany(() => Comment, (comment) => comment.task)
  comments: Comment[];

  @OneToMany(() => History, (history) => history.task)
  histories: History[];

  @OneToMany(() => TaskUser, (taskUser) => taskUser.task)
  assignedUsers: TaskUser[];

}
