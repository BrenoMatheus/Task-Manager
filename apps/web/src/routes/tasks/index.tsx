// src/routes/tasks/index.tsx

import { createFileRoute, redirect } from "@tanstack/react-router";
import { useAuth } from "@/store/auth"; // <-- Zustand
import { useTasks } from "../../hooks/tasks/use-tasks";
import { TaskBoard } from "./components/Taskboard";
import { useUpdateTaskStatus } from "@/hooks/tasks/use-mutation";
import TaskModal from "./components/TaskModal";
import { useState } from "react";
import { Bell, CirclePlus } from "lucide-react";
import { NotificationPanel } from "./components/NotificationPanel";

export const Route = createFileRoute("/tasks/")({
  beforeLoad: () => {
    const token = useAuth.getState().token;

    if (!token) {
      throw redirect({ to: "/login" });
    }
  },

  component: TasksPage,
});

function TasksPage() {
  const { user } = useAuth();
  const { data, isLoading } = useTasks();
  const updateStatus = useUpdateTaskStatus();
  const [openModal, setOpenModal] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);

  return (
    <div className="p-6 ">
      <div className="flex justify-between">
        <div>
          <h1 className="text-2xl font-bold">Tarefas</h1>
        </div>

        <div>
          {/* Botão Notificações */}
          <button
            data-no-dnd="true"
            className="rounded-lg p-1 hover:bg-blue-100 transition"
            onClick={(e) => {
              e.stopPropagation();
              setOpenNotifications(true);
            }}
          >
            <Bell size={26} className="text-slate-600" />
          </button>

          {/* Nova Tarefa */}
          <button
            data-no-dnd="true"
            className="rounded-lg hover:bg-green-100"
            onClick={(e) => {
              e.stopPropagation();
              setOpenModal(true);
            }}
          >
            <CirclePlus size={28} className="text-slate-600" />
          </button>
        </div>
      </div>

      {isLoading && <p>Carregando...</p>}

      {data && (
        <TaskBoard
          tasks={data}
          onStatusChange={(id, status) =>
            updateStatus.mutate({ id, status })
          }
        />
      )}

      {/* MODAL NOVA TAREFA */}
      <TaskModal open={openModal} onOpenChange={setOpenModal} />

      {/* MODAL NOTIFICAÇÕES */}
      <NotificationPanel
        open={openNotifications}
        onOpenChange={setOpenNotifications}
        userId={user!.id}
      />
    </div>
  );
}
