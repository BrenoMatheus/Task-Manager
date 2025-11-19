import { useQuery } from "@tanstack/react-query";
import { api } from "@/api/client";

export interface Notification {
  id: number;
  taskId: number;
  userId: number;
  userName: string;
  type: string;
  read: boolean;
  message: string;
  createdAt: Date;
}

export function useNotifications(userId: number) {
  return useQuery<Notification[]>({
    queryKey: ["notifications"],
    queryFn: async () => api.get<Notification[]>(`/notifications/user/${userId}`),

  });
}

