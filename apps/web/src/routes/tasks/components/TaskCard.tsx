import { useState } from "react";
import { useDraggable } from "@dnd-kit/core";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye } from "lucide-react";
import type { Task } from "@/types/taskTypes";
import TaskModal from "./TaskModal";
import UserAvatarGroup from "./UserAvatarGroup";

export function TaskCard({ task }: { task: Task }) {
  const [openModal, setOpenModal] = useState(false);

  const priorityColors: Record<string, string> = {
    LOW: "bg-green-200 text-green-800",
    MEDIUM: "bg-yellow-200 text-yellow-800",
    HIGH: "bg-orange-200 text-orange-800",
    URGENT: "bg-red-200 text-red-800",
  };
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = transform
    ? { transform: `translate(${transform.x}px, ${transform.y}px)` }
    : undefined;

  return (
    <>
      <Card
        ref={setNodeRef}
        style={style}
        className="p-3 mb-3 bg-slate-100 cursor-grab rounded-xl relative"
      >
        {/* BOTÃO INFO (não arrasta, não aciona listeners) */}
        <button
          data-no-dnd="true"
          className="absolute right-2 p-1 rounded hover:bg-slate-200"
          onClick={(e) => {
            e.stopPropagation();
            setOpenModal(true);
          }}
        >
          <Eye size={24} className="text-gray-600" />
        </button>

        {/* ÁREA ARRASTÁVEL */}
        <div {...listeners} {...attributes}>
          <div className="grid grid-cols-4 gap-4">
            <div>
              {/* TÍTULO */}
              <h3 className="text-sm font-semibold text-gray-800">{task.title}</h3>
              
            </div>
            
            <div className="flex justify-between items-center mt-2">
              <Badge
                className={`${priorityColors[task.priority]} text-[10px] px-2 py-0.5 rounded-md`}
              >
                {task.priority}
              </Badge>
            </div>
            
            <div>
              <UserAvatarGroup users={task.assignedUsers} size={32} />
            </div>

            <div>
              {task.dueDate && (
                <span className="text-[12px] text-gray-400">
                  {new Date(task.dueDate).toLocaleDateString("pt-BR")}
                </span>
              )}
            </div>

          </div>

        </div>
      </Card>

      {/* MODAL */}
      <TaskModal
        open={openModal}
        onOpenChange={setOpenModal}
        task={task}

      />
    </>
  );
}
