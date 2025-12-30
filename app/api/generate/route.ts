import { NextRequest, NextResponse } from "next/server";
import { getSocketServer } from "@/lib/socketServer";

export const runtime = "nodejs";

interface QueuePayload {
  id: string;
  prompt: string;
  createdAt: number;
}

interface ProgressWindow {
  label: string;
  min: number;
  max: number;
}

const PROGRESS_WINDOWS: ProgressWindow[] = [
  { label: "Scouting inspirations", min: 1, max: 10 },
  { label: "Sketching melody", min: 10, max: 20 },
  { label: "Layering rhythm", min: 20, max: 30 },
  { label: "Sound design", min: 30, max: 40 },
  { label: "Mixing dynamics", min: 40, max: 50 },
  { label: "Vocals & stems", min: 50, max: 60 },
  { label: "FX sculpting", min: 60, max: 70 },
  { label: "Mastering polish", min: 70, max: 80 },
  { label: "Packaging download", min: 80, max: 90 },
  { label: "Checksum & delivery", min: 90, max: 99 },
];

function randomInRange(min: number, max: number) {
  if (max <= min) return min;
  return min + Math.random() * (max - min);
}

function nextProgressValue(window: ProgressWindow, previous: number): number {
  const candidate = Math.round(randomInRange(window.min + 1, window.max));
  const clamped = Math.min(window.max, Math.max(window.min + 1, candidate));
  return Math.min(99, Math.max(previous + 1, clamped));
}

function buildTitle(prompt: string, suffix: string) {
  const cleaned = prompt.replace(/[^a-zA-Z0-9\s]/g, "").trim();
  const words = cleaned.split(/\s+/).filter(Boolean).slice(0, 3);
  if (!words.length) {
    return `Untitled ${suffix}`;
  }
  return `${words
    .map((word) => word[0].toUpperCase() + word.slice(1))
    .join(" ")} ${suffix}`.trim();
}

function emitProgressEvents(queue: QueuePayload) {
  const io = getSocketServer();
  if (!io) return;

  let elapsed = 0;
  let lastProgress = 0;

  PROGRESS_WINDOWS.forEach((window) => {
    const delay = 800 + Math.random() * 1100; // each stage fires between ~0.8s-1.9s
    elapsed += delay;
    const progress = nextProgressValue(window, lastProgress);
    lastProgress = progress;

    setTimeout(() => {
      io.emit("generation:progress", {
        ...queue,
        progress,
        status: window.label,
      });
    }, elapsed);
  });

  const completionDelay = elapsed + 1000 + Math.random() * 1500;

  setTimeout(() => {
    const successThreshold = 0.12;
    const shouldFail = Math.random() < successThreshold;

    if (shouldFail) {
      io.emit("generation:failed", {
        ...queue,
        progress: 100,
        error: "Network spike interrupted the render. Please retry.",
      });
      return;
    }

    const variants = [
      {
        title: buildTitle(queue.prompt, "Echo"),
        version: "v1",
        duration: 36 + Math.floor(Math.random() * 30),
      },
      {
        title: buildTitle(queue.prompt, "Pulse"),
        version: "v2",
        duration: 48 + Math.floor(Math.random() * 30),
      },
    ];

    io.emit("generation:completed", {
      ...queue,
      progress: 100,
      variants,
    });
  }, completionDelay);
}

export async function POST(request: NextRequest) {
  const io = getSocketServer();
  if (!io) {
    return NextResponse.json(
      { error: "Socket server unavailable" },
      { status: 503 }
    );
  }

  const body = await request.json().catch(() => null);
  const prompt = body?.prompt?.trim();

  if (!prompt) {
    return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
  }

  if (prompt.length > 280) {
    return NextResponse.json(
      { error: "Prompt must be under 280 characters" },
      { status: 422 }
    );
  }

  const queuePayload: QueuePayload = {
    id: crypto.randomUUID(),
    prompt,
    createdAt: Date.now(),
  };

  io.emit("generation:queued", queuePayload);
  emitProgressEvents(queuePayload);

  return NextResponse.json({ id: queuePayload.id });
}
