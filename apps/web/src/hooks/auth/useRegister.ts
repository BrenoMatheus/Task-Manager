import { api } from "@/api/client";
import { useMutation } from "@tanstack/react-query";

interface RegisterPayload {
  name: string;
  email: string;
  password: string;
}

export function useRegister() {
  return useMutation({
    mutationFn: async (payload: RegisterPayload) => {
      const response = await api.post("/auth/register", payload);
    },
  });
}
