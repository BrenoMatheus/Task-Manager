import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useCreateTask } from "@/hooks/tasks/useCreateTask";
import { useUpdateTask } from "@/hooks/tasks/useUpdateTask";
import type { Task } from "@/types/taskTypes";
import { useDeleteTask } from "@/hooks/tasks/useDeleteTask";
import { TaskComments } from "./TaskComments";
import AssignUsersToTask from "./AssignUsersToTask";

interface TaskModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: Task | null;
}

export default function TaskModal({ open, onOpenChange, task }: TaskModalProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("LOW");
  const [dueDate, setDueDate] = useState<string | "">("");

  const createTask = useCreateTask();
  const updateTask = useUpdateTask();
  const deleteTask = useDeleteTask();

  const handleDelete = () => {
    if (!task?.id) {
      alert("Não foi possível deletar a tarefa: ID não definido.");
      return;
    }

    if (confirm("Deseja realmente deletar esta tarefa?")) {
      deleteTask.mutate(
        { id: task.id }, // <- importante passar como objeto
        {
          onSuccess: () => {
            onOpenChange(false);
          },
        }
      );
    }
  };

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description || "");
      setPriority(task.priority);
      setDueDate(task.dueDate || "");
    } else {
      setTitle("");
      setDescription("");
      setPriority("LOW");
      setDueDate("");
    }
  }, [task]);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const payload = {
      id: task?.id,
      title,
      description,
      priority,
      dueDate,
      //userId,
      status: task?.status || "TODO",
    };

    if (task?.id) {
      updateTask.mutate(payload, {
        onSuccess: () => onOpenChange(false),
      });
    } else {
      createTask.mutate(payload, {

        onSuccess: () => {
          // Fecha o modal
          onOpenChange(false);

          // Limpa os campos
          setTitle("");
          setDescription("");
          setPriority("LOW");
          setDueDate("");
        },
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>{task ? "Editar Tarefa" : "Criar Nova Tarefa"}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-2 gap-2">
          <div className='p-3 rounded-xl border bg-slate-100'>


            <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
              <div>
                <label className="text-sm font-medium">Título</label>
                <Input className="bg-white" value={title} onChange={(e) => setTitle(e.target.value)} required />
              </div>

              <div>
                <label className="text-sm font-medium">Descrição</label>
                <Textarea
                  className="bg-white"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>

              <div>
                <label className="text-sm font-medium">Prioridade</label>
                <Select value={priority} onValueChange={setPriority} >
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Selecione a prioridade" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="LOW">Baixa</SelectItem>
                    <SelectItem value="MEDIUM">Média</SelectItem>
                    <SelectItem value="HIGH">Alta</SelectItem>
                    <SelectItem value="URGENT">Urgente</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Data Limite</label>
                <Input
                  className="bg-white"
                  type="date"
                  value={dueDate || ""}
                  onChange={(e) => setDueDate(e.target.value)}
                />
              </div>

              {task && (
                <div className="mt-4">
                  <AssignUsersToTask taskId={task.id} />
                </div>
              )}

              {task ?
                <Button
                  type="button"
                  onClick={handleDelete}
                  className="w-full bg-white text-gray-800 border-2 border-red-400 hover:bg-red-400">
                  Delete
                </Button> : ''}

              <Button type="submit" className="w-full ">
                {task ? "Salvar Alterações" : "Criar Tarefa"}
              </Button>
            </form>
          </div>
          {task ?
            <div className='p-3 rounded-xl border bg-slate-100'>
              <TaskComments taskId={task.id} userId={1} />
            </div>
            : ""}
        </div>
      </DialogContent>
    </Dialog>
  );
}
