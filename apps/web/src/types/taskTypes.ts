import type { TaskStatus } from "@/routes/tasks/constants/taskStatus";

export interface AssignedUser {
  id: number;
  userId: number;
  userName: string ;
}

export interface Task {
  id: number;
  title: string;
  description?: string | null;
  priority: string;
  status: TaskStatus;
  userId: number;
  dueDate?: string | null;
  assignedUsers: AssignedUser[];
}
