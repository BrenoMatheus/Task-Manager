import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/client";

interface DeleteTaskUserPayload {
  id: number;
}

export function useDeleteTaskUser() {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, DeleteTaskUserPayload>({
    mutationFn: async ({ id }) => {
      await api.delete(`/tasks/users/${id}`);
    },
    onSuccess: () => {
      // Atualiza lista geral de tarefas
      queryClient.invalidateQueries({ queryKey: ["taskUsers"] });
      // Atualiza tarefa individual, caso esteja usando fetch por id
      queryClient.invalidateQueries({ queryKey: ["taskUser"] });
    },
  });
}
