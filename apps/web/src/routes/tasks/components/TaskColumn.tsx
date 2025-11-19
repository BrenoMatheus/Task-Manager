import { useDroppable } from "@dnd-kit/core";
import { TaskCard } from "./TaskCard";
import { STATUS_LABELS, type TaskStatus,  } from "../constants/taskStatus";
import type { Task } from "./Taskboard";

interface TaskColumnProps {
  id: TaskStatus;  // Representa o status da coluna (TODO, IN_PROGRESS, etc.)
  tasks: Task[];   // Lista de tarefas pertencentes à coluna
}

export function TaskColumn({ id, tasks }: TaskColumnProps) {
  /**
   * useDroppable cria uma área onde cards podem ser soltos
   */
  const { setNodeRef, isOver } = useDroppable({
    id, // Identificador único da área
  });

  return (
    <div
      ref={setNodeRef}
      className={`p-3 rounded-xl border bg-slate-200 min-h-[100px] transition-colors ${
        isOver ? "bg-slate-300" : ""
      }`}
    >
      {/* Título da coluna (traduzido) */}
      <h2 className="text-lg font-bold mb-3">{STATUS_LABELS[id]}</h2>

      {/* Renderização das tasks */}
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
