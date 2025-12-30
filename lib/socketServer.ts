import type { Server as SocketIOServer } from "socket.io";

export function getSocketServer(): SocketIOServer | undefined {
  return globalThis.__socketServer;
}

export function setSocketServer(server: SocketIOServer) {
  globalThis.__socketServer = server;
}
