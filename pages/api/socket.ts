import type { NextApiRequest } from "next";
import type { NextApiResponse } from "next";
import { Server as SocketIOServer } from "socket.io";
import type { Server as HTTPServer } from "http";
import type { Socket } from "net";
import { setSocketServer } from "@/lib/socketServer";

interface NextApiResponseWithSocket extends NextApiResponse {
  socket: Socket & {
    server: HTTPServer & {
      io?: SocketIOServer;
    };
  };
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default function socketHandler(
  _req: NextApiRequest,
  res: NextApiResponseWithSocket
) {
  if (!res.socket.server.io) {
    const io = new SocketIOServer(res.socket.server, {
      path: "/api/socket",
      addTrailingSlash: false,
    });

    io.on("connection", (socket) => {
      socket.emit("socket:connected", { connectedAt: Date.now() });
    });

    res.socket.server.io = io;
    setSocketServer(io);
  }

  res.end();
}
