import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import { useMemo } from "react";
import { TaskColumn } from "./TaskColumn";
import { STATUS, type TaskStatus } from "../constants/taskStatus";

export interface Task {
  id: number;
  title: string;
  description?: string | null;
  priority: string;
  status: TaskStatus;
  userId: number;
  dueDate?: string | null;
}

interface TaskBoardProps {
  tasks: Task[];
  onStatusChange: (taskId: number, newStatus: TaskStatus) => void;
}

export function TaskBoard({ tasks, onStatusChange }: TaskBoardProps) {

  /**
   * Agora NÃO salvamos mais tasks no useState.
   * Sempre recalculamos com base na prop `tasks`.
   */
  const tasksByStatus = useMemo(() => {
    const groups: Record<TaskStatus, Task[]> = {
      TODO: [],
      IN_PROGRESS: [],
      REVIEW: [],
      DONE: [],
    };

    for (const task of tasks) {
      groups[task.status].push(task);
    }

    return groups;
  }, [tasks]);

  /**
   * Drag end apenas dispara o update para o backend
   * Não atualizamos mais o estado local — React Query fará isso.
   */
  function handleDragEnd(event: DragEndEvent) {
    const draggedTask = event.active;
    const dropZone = event.over;

    if (!dropZone) return;

    const taskId = Number(draggedTask.id);
    const newStatus = dropZone.id as TaskStatus;

    // Backend update → React Query invalida → Tasks atualizadas → TaskBoard rerender automático
    onStatusChange(taskId, newStatus);
  }

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="grid grid-row-4 gap-4">
        {STATUS.map((status) => (
          <TaskColumn
            key={status}
            id={status}
            tasks={tasksByStatus[status]}
          />
        ))}
      </div>
    </DndContext>
  );
}
