"use client";

import { useEffect } from "react";
import { io, type Socket } from "socket.io-client";
import { useGenerationStore } from "@/store/useGenerationStore";

let socket: Socket | null = null;

export function useGenerationSocket() {
  const handleQueued = useGenerationStore((state) => state.handleQueued);
  const handleProgress = useGenerationStore((state) => state.handleProgress);
  const handleCompleted = useGenerationStore((state) => state.handleCompleted);
  const handleFailed = useGenerationStore((state) => state.handleFailed);
  const setSocketConnected = useGenerationStore(
    (state) => state.setSocketConnected
  );

  useEffect(() => {
    if (!socket) {
      socket = io({ path: "/api/socket" });
    }

    const activeSocket = socket;

    const onConnect = () => setSocketConnected(true);
    const onDisconnect = () => setSocketConnected(false);

    activeSocket.on("connect", onConnect);
    activeSocket.on("disconnect", onDisconnect);
    activeSocket.on("generation:queued", handleQueued);
    activeSocket.on("generation:progress", handleProgress);
    activeSocket.on("generation:completed", handleCompleted);
    activeSocket.on("generation:failed", handleFailed);

    return () => {
      activeSocket.off("connect", onConnect);
      activeSocket.off("disconnect", onDisconnect);
      activeSocket.off("generation:queued", handleQueued);
      activeSocket.off("generation:progress", handleProgress);
      activeSocket.off("generation:completed", handleCompleted);
      activeSocket.off("generation:failed", handleFailed);
    };
  }, [
    handleQueued,
    handleProgress,
    handleCompleted,
    handleFailed,
    setSocketConnected,
  ]);
}
