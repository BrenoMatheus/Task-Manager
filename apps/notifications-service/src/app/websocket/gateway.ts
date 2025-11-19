import {
  WebSocketGateway,
  WebSocketServer,
} from "@nestjs/websockets";
import { Server } from "socket.io";

@WebSocketGateway({
  cors: { origin: "*" },
})
export class WebsocketGateway {
  @WebSocketServer()
  server: Server;

  sendToUser(userId: string, payload: any) {
    this.server.to(userId).emit("notification", payload);
  }

  handleConnection(client: any) {
    const userId = client.handshake.query.userId;
    if (userId) {
      client.join(userId);
      console.log(`🔌 User connected: ${userId}`);
    }
  }
}
