import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/client";

interface DeleteTaskPayload {
  id: number;
}

export function useDeleteTask() {
  const queryClient = useQueryClient();

  return useMutation<void, unknown, DeleteTaskPayload>({
    mutationFn: async ({ id }) => {
      await api.delete(`/tasks/${id}`);
    },
    onSuccess: () => {
      // Atualiza lista geral de tarefas
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      // Atualiza tarefa individual, caso esteja usando fetch por id
      queryClient.invalidateQueries({ queryKey: ["task"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}
