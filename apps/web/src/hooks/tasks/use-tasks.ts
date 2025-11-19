import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/client";

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: string;
}

export function useTasks() {
  return useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: async () => api.get<Task[]>("/tasks"),

  });
}

