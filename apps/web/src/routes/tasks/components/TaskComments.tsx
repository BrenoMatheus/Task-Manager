import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useComments, type Comment } from "@/hooks/comment/useComments";
import { useCreateComment } from "@/hooks/comment/useCreateComment";
import { useDeleteComment } from "@/hooks/comment/useDeleteComment";
import { CircleX } from "lucide-react";

interface TaskCommentsProps {
  taskId: number;
  userId: number;
}

export function TaskComments({ taskId, userId }: TaskCommentsProps) {
  const [content, setContent] = useState("");

  const { data: comments = [], isLoading } = useComments(taskId);
  const createComment = useCreateComment();
  const deleteComment = useDeleteComment();

  const handleDelete = (id: number) => {
    if (!id) {
      alert("Não foi possível deletar o comentário: ID não definido.");
      return;
    }

    if (confirm("Deseja realmente deletar este comentário?")) {
      deleteComment.mutate({ id });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;

    createComment.mutate({ taskId, content, userId });
    setContent(""); // limpa o campo
  };

  return (
    <div className="flex flex-col border-l border-gray-200 pl-4 h-full">
      <h3 className="font-semibold text-lg mb-2">Comentários</h3>

      {/* Lista de comentários com altura limitada para 4 visíveis */}
      <div className="flex flex-col gap-2 overflow-y-auto max-h-[280px] mb-2">
        {isLoading ? (
          <p>Carregando comentários...</p>
        ) : comments.length === 0 ? (
          <p>Nenhum comentário ainda.</p>
        ) : (
          comments.map((comment: Comment) => (
            <div
              key={comment.id}
              className="p-2 rounded bg-white flex justify-between items-start shadow-sm"
            >
              <div className="flex-1">
                <p className="text-sm">{comment.content}</p>
                <p className="text-xs text-gray-500">
                  Usuário: {comment.userId} -{" "}
                  {new Date(comment.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                type="button"
                className="p-1 rounded hover:bg-slate-200 ml-2"
                onClick={() => handleDelete(comment.id)}
              >
                <CircleX size={16} className="text-gray-600" />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Formulário sempre fixo abaixo */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-2 mt-auto">
        <Textarea
          className="bg-white"
          placeholder="Escreva um comentário..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows={3}
          required
        />
        <Button type="submit" className="w-full">
          Adicionar Comentário
        </Button>
      </form>
    </div>
  );
}
