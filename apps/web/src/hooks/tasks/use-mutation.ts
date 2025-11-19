import { useMutation, useQueryClient, type QueryClient } from "@tanstack/react-query";
import { api } from "@/api/client";
import type { Task } from "@/types/taskTypes";
import type { TaskStatus } from "@/routes/tasks/constants/taskStatus";

// ------------------------
// Tipos explícitos
// ------------------------

interface UpdateTaskStatusPayload {
  id: number;
  status: TaskStatus;
}

interface OptimisticContext {
  previousTasks?: Task[];
}

// ------------------------
// Mutation (PATCH /tasks/:id)
// ------------------------

export function useUpdateTaskStatus() {
  const queryClient: QueryClient = useQueryClient();

  return useMutation<any, Error, UpdateTaskStatusPayload, OptimisticContext>({
    // -------------------------------------
    // Função que executa o PATCH na API
    // -------------------------------------
    mutationFn: async ({ id, status }: UpdateTaskStatusPayload) => {
        return api.patch(`/tasks/${id}`, { status });
    },


    // -------------------------------------
    // Otimização otimista
    // -------------------------------------
    onMutate: async ({ id, status }: UpdateTaskStatusPayload) => {
      // cancela requisições em andamento sobre 'tasks'
      await queryClient.cancelQueries({ queryKey: ["tasks"] });

      // captura os dados antigos para rollback
      const previousTasks = queryClient.getQueryData<Task[]>(["tasks"]);

      // atualiza otimistamente
      queryClient.setQueryData<Task[]>(["tasks"], (oldTasks) => {
        if (!oldTasks) return [];
        return oldTasks.map((task) =>
          task.id === id ? { ...task, status } : task
        );
      });

      // passa para o contexto do onError
      return { previousTasks };
    },

    // -------------------------------------
    // Caso dê erro, desfaz o update otimista
    // -------------------------------------
    onError: (error, _vars, context) => {
      if (context?.previousTasks) {
        queryClient.setQueryData(["tasks"], context.previousTasks);
      }
    },

    // -------------------------------------
    // Sempre revalida os dados no final
    // -------------------------------------
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
    },
  });
}
