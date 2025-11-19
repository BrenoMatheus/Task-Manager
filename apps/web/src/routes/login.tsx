// src/routes/login.tsx
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useLogin } from "@/hooks/auth/useLogin";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/login")({
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const login = useLogin();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    login.mutate(form, {
      onSuccess: () => navigate({ to: "/tasks" }),
    });
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="
          w-full max-w-sm p-8 rounded-2xl shadow-2xl border
          backdrop-blur-sm bg-white/70 space-y-6
          animate-fadeIn
        "
      >
        {/* Header */}
        <div className="text-center space-y-1">
          <h1 className="text-3xl font-semibold text-slate-800">Bem-vindo</h1>
          <p className="text-sm text-slate-500">Entre para acessar suas tarefas</p>
        </div>

        {/* Email */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Email</label>
          <Input
            placeholder="seuemail@exemplo.com"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="text-sm font-medium text-slate-700">Senha</label>
          <Input
            placeholder="Sua senha"
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
        </div>

        {/* Submit */}
        <Button
          className="w-full text-md py-2"
          disabled={login.isPending}
        >
          Entrar
        </Button>

        {/* Footer */}
        <p className="text-center text-xs text-slate-500 mt-2">
          Gerenciador de Tarefas • 2025
        </p>
        <div className="text-center text-sm">
          <span className="text-slate-600">Não tem conta? </span>
          <Link
            to="/register"
            className="text-blue-600 font-medium hover:underline"
          >
            Criar conta
          </Link>
        </div>

      </form>
    </div>

  );
}
