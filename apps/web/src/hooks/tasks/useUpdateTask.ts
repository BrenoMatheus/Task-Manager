// src/hooks/useUpdateTask.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/client";

interface UpdateTaskPayload {
  id: number;
  title?: string;
  description?: string | null;
  priority?: string;
  status?: string;
  dueDate?: string | null;
  userId?: number;
}

export function useUpdateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ id, ...data }: UpdateTaskPayload) => {
      return api.patch(`/tasks/${id}`, data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["task"] }); // caso use fetch por id
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}
