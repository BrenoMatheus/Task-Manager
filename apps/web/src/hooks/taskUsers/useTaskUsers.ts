import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/client";

export interface TaskUser {
  id: number;
  taskId: number;
  userId: number;
  userName: string;
  //createdAt: string;
}

export function useTaskUsers(taskId: number) {
  return useQuery<TaskUser[]>({
    queryKey: ["taskUsers"],
    queryFn: async () => api.get<TaskUser[]>(`/tasks/${taskId}/users`),

  });
}

