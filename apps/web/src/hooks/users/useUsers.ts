import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/client";

export interface User {
  id: number;
  name: string;
}

export function useUsers() {
  return useQuery<User[]>({
    queryKey: ["users"],
    queryFn: async () => api.get<User[]>("/auth/users"),

  });
}

