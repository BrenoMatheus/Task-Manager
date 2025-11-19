import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/client";

interface DeleteCommentPayload {
  id: number;
}

export function useDeleteComment() {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, DeleteCommentPayload>({
    mutationFn: async ({ id }) => {
      await api.delete(`/tasks/comments/${id}`);
    },
    onSuccess: () => {
      // Atualiza lista geral de tarefas
      queryClient.invalidateQueries({ queryKey: ["comments"] });
      // Atualiza tarefa individual, caso esteja usando fetch por id
      queryClient.invalidateQueries({ queryKey: ["comment"] });
    },
  });
}
