import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Command, CommandInput, CommandItem, CommandList, CommandGroup } from "@/components/ui/command";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Check } from "lucide-react";
import { useUsers } from "@/hooks/users/useUsers";

interface UserSelectAutocompleteProps {
  value: number | null;        // userId selecionado
  onChange: (userId: number | null) => void;
}

export default function UserSelectAutocomplete({ value, onChange }: UserSelectAutocompleteProps) {
  const [open, setOpen] = useState(false);
  const { data: users, isLoading } = useUsers();

  const selectedUser = users?.find((u) => u.id === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger className="w-full">
        <Input
          className="bg-white cursor-pointer"
          value={selectedUser?.name || ""}
          placeholder="Selecione um usuário"
          onClick={() => setOpen(true)}
          readOnly
        />
      </PopoverTrigger>

      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Buscar usuário..." />

          <CommandList>
            <CommandGroup>
              {isLoading && <div className="p-2 text-sm">Carregando...</div>}

              {users?.map((user) => (
                <CommandItem
                  key={user.id}
                  value={user.name}
                  onSelect={() => {
                    onChange(user.id);
                    setOpen(false);
                  }}
                >
                  <Check
                    className={`mr-2 h-4 w-4 ${
                      value === user.id ? "opacity-100" : "opacity-0"
                    }`}
                  />
                  {user.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
