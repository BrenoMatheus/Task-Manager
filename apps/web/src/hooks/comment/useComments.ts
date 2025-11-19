import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/client";

export interface Comment {
  id: number;
  taskId: number;
  content: string;
  userId: number;
  createdAt: string;
}

export function useComments(taskId: number) {
  return useQuery<Comment[]>({
    queryKey: ["comments"],
    queryFn: async () => api.get<Comment[]>(`/tasks/${taskId}/comments`),

  });
}

