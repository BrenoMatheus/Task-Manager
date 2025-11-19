import { createFileRoute, redirect } from "@tanstack/react-router";
import { useAuth } from "@/store/auth"; // Zustand

export const Route = createFileRoute("/")({
  beforeLoad: () => {
    const token = useAuth.getState().token;

    if (!token) {
      throw redirect({ to: "/login" });
    }
  },

});
