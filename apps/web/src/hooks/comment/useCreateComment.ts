// src/hooks/useCreateTask.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/client";

interface CreateCommentPayload {
  taskId: number;
  content: string;
  userId: number;
}

export function useCreateComment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateCommentPayload) => {
      return api.post(`/tasks/${data.taskId}/comments`, data);
    },

    onSuccess: (_data, variables)  => {
        // invalida cache para atualizar a lista
        queryClient.invalidateQueries(["task-comments", variables.taskId]);
    },
  });
}
