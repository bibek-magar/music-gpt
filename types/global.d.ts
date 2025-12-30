import type { Server as SocketIOServer } from "socket.io";

declare global {
  var __socketServer: SocketIOServer | undefined;
}

export {};
