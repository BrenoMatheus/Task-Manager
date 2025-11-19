// src/hooks/useUpdateNotification.ts
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/api/client";


export function useUpdateNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ( id:number ) => {
      return api.patch(`/notifications/read/${id}`,{});
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      queryClient.invalidateQueries({ queryKey: ["notification"] }); // caso use fetch por id
    },
  });
}
