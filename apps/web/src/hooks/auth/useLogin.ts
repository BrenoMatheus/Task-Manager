import { useMutation } from "@tanstack/react-query";
import { useAuth } from "@/store/auth";
import { api } from "@/api/client";

interface LoginPayload {
  email: string;
  password: string;
}

export function useLogin() {
  const loginStore = useAuth();

  return useMutation({
    mutationFn: async ({ email, password }: LoginPayload) => {
      // agora usando seu cliente "api"
      const response = await api.post<{ access_token: string }>(
        "/auth/login",
        { email, password }
      );
      return response;
    },

    onSuccess: (data) => {
      // data.access_token vem da sua API
      loginStore.login(data.access_token, data.user);
    },
  });
}
