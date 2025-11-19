import { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

export function useNotificationSocket(userId: number) {
  const [realtimeNotifications, setRealtimeNotifications] = useState<any[]>([]);

  useEffect(() => {
    if (!userId) return;

    // Conecta ao backend
    const socket = io("http://localhost:3004/notifications", {
        query: { userId }
    });

    socket.on("connect", () => {
      console.log("🔌 Socket.IO conectado!");
    });

    // Recebe notificações enviadas pelo servidor
    socket.on("notification", (notification) => {
      console.log("📩 Notificação recebida:", notification);
      setRealtimeNotifications(prev => [notification, ...prev]);
    });

    socket.on("disconnect", () => {
      console.log("❌ Socket.IO desconectado");
    });

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  return { realtimeNotifications };
}
