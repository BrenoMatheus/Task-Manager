// src/hooks/useCreateTask.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/client";

interface CreateTaskPayload {
  title: string;
  description?: string;
  priority: string;
  status: string;
  dueDate?: string | null;
  userId: number;
}

export function useCreateTask() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: CreateTaskPayload) => {
      return api.post("/tasks", data);
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["tasks"] });
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
}
