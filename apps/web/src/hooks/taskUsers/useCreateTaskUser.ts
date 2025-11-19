// src/hooks/useCreateTask.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/client";

interface CreateTaskUserPayload {
  taskId: number;
  userId: number;
}

export function useCreateTaskUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateTaskUserPayload) => {
      return api.post(`/tasks/${data.taskId}/users/${data.userId}`, {});
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["taskUsers"] });
    },
  });
}
