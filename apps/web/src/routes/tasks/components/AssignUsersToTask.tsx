// components/AssignUsersToTask.tsx
import { useState } from "react";
import { Button } from "@/components/ui/button";
import UserSelectAutocomplete from "./UserSelectAutocomplete";
import { useUsers } from "@/hooks/users/useUsers";
import { X } from "lucide-react";
import { useDeleteTaskUser } from "@/hooks/taskUsers/useDeleteTaskUser";
import { useCreateTaskUser } from "@/hooks/taskUsers/useCreateTaskUser";
import { useTaskUsers } from "@/hooks/taskUsers/useTaskUsers";

interface AssignUsersToTaskProps {
  taskId: number;
}

export default function AssignUsersToTask({ taskId }: AssignUsersToTaskProps) {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const { data: users } = useUsers();
  const { data: assigned, isLoading } = useTaskUsers(taskId);

  const addUser = useCreateTaskUser();
  const removeUser = useDeleteTaskUser();

  function handleAdd() {
    if (!selectedUserId) return;

    addUser.mutate(
      { taskId, userId: selectedUserId },
      {
        onSuccess: () => setSelectedUserId(null),
      }
    );
  }

  return (
    <div className="space-y-4 p-3 border rounded-xl bg-white">

      <h3 className="font-semibold text-sm text-gray-700">Atribuir usuário</h3>

      <div className="flex gap-2 items-center">
        <UserSelectAutocomplete
          value={selectedUserId}
          onChange={setSelectedUserId}
        />

        <Button onClick={handleAdd} disabled={!selectedUserId}>
          Adicionar
        </Button>
      </div>

      <div className="mt-3">
        <h4 className="text-sm font-medium text-gray-600">Atribuídos:</h4>

        {isLoading && <p>Carregando...</p>}

        <div className="flex flex-col gap-2 mt-2 overflow-y-auto max-h-[70px] ">
          {assigned?.map((item: any) => (
            <div key={item.id} className="flex justify-between items-center pl-2 border rounded-md bg-slate-50">
              <span className="font-medium">{item.userName}</span>

              <Button
                size="icon"
                onClick={() => removeUser.mutate({id: item.id})}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
