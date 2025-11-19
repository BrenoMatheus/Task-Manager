import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useRegister } from "@/hooks/auth/useRegister";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/register")({
  component: RegisterPage,
});

function RegisterPage() {
  const registerMutation = useRegister();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    registerMutation.mutate(form, {
      onSuccess: () => {
        alert("Usuário criado com sucesso! Faça login.");
        navigate({ to: "/login" }); // ← REDIRECIONA PRA LOGIN
      },
    });
  }

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="p-6 shadow-lg border rounded-lg w-80 space-y-4"
      >
        <h2 className="text-xl font-bold text-center">Criar conta</h2>

        <Input
          placeholder="Nome"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <Input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <Input
          placeholder="Senha"
          type="password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <Button className="w-full" disabled={registerMutation.isPending}>
          Registrar
        </Button>
        <div className="p-2 text-center">
          Já tem conta? 
          <Link
            to="/login"
            className="text-blue-600 pl-2 font-medium hover:underline"
          >
             Login
          </Link>
        </div>
      </form>
    </div>
  );
}
