import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useNotifications } from "@/hooks/notifications/useNotifications";
import { useUpdateNotification } from "@/hooks/notifications/useUpdateNotification";
import { Info, Pencil, Bell, Trash } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useNotificationSocket } from "@/hooks/notifications/useNotificationSocket";

function getIconByType(type: string) {
  switch (type) {
    case "task_updated":
      return <Pencil className="h-4 w-4 text-blue-600" />;
    case "task_created":
      return <Info className="h-4 w-4 text-green-600" />;
    case "task_deleted":
      return <Trash className="h-4 w-4 text-red-600" />;
    default:
      return <Bell className="h-4 w-4 text-slate-500" />;
  }
}

function formatBrazilDate(date: string) {
  return format(new Date(date), "dd/MM/yyyy HH:mm", { locale: ptBR });
}

export function NotificationPanel({ open, onOpenChange, userId }: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  userId: number;
}) {

  const { data: notifications = [], isLoading } = useNotifications(userId);
  const { realtimeNotifications } = useNotificationSocket(userId);

  const allNotifications = [
    ...realtimeNotifications,
    ...notifications
  ];

  const markAsRead = useUpdateNotification(); // <-- Hook para marcar como lida

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-blue-600" />
            Notificações
          </DialogTitle>
        </DialogHeader>

        <ScrollArea className="h-80 pr-2 mt-2">
          <div className="flex flex-col gap-3">

            {isLoading && (
              <p className="text-sm text-center text-slate-500">
                Carregando notificações...
              </p>
            )}

            {!isLoading && allNotifications.length === 0 && (
              <p className="text-sm text-center text-slate-500 mt-6">
                Nenhuma notificação
              </p>
            )}

            {!isLoading &&
              allNotifications.map((notification) => (
                <div
                  key={notification.id}
                  onClick={() => markAsRead.mutate(notification.id)}
                  className={`
                    p-4 rounded-xl border shadow-sm transition-all cursor-pointer
                    ${!notification.read ? "bg-blue-50 border-blue-200" : "bg-white"}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-full bg-white shadow-sm border">
                      {getIconByType(notification.type)}
                    </div>

                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-800">
                        {notification.message}
                      </p>

                      <p className="text-xs text-gray-500">
                        {formatBrazilDate(notification.createdAt)}
                      </p>
                    </div>

                    {!notification.read && (
                      <span className="h-3 w-3 rounded-full bg-blue-600"></span>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
