"use client";

import { create } from "zustand";

export type GenerationStatus = "queued" | "generating" | "completed" | "failed";

export interface GenerationVariant {
  version: string;
  title: string;
  duration: number;
}

export interface Generation {
  id: string;
  prompt: string;
  status: GenerationStatus;
  progress: number;
  createdAt: number;
  phaseLabel?: string;
  variants: GenerationVariant[];
  error?: string;
}

interface GenerationStore {
  generations: Generation[];
  isSubmitting: boolean;
  isPaginating: boolean;
  socketConnected: boolean;
  lastError?: string;
  lastErrorPrompt?: string;
  lastErrorTitle?: string;
  credits: number;
  totalCredits: number;
  showInsufficient: boolean;
  insufficientReason?: string;
  shouldOpenProfile: boolean;
  submitPrompt: (prompt: string) => Promise<string | undefined>;
  loadMoreHistory: () => Promise<void>;
  acknowledgeError: () => void;
  setSocketConnected: (next: boolean) => void;
  debitCredits: (amount: number) => void;
  topUpCredits: () => void;
  dismissInsufficient: () => void;
  triggerInsufficient: (reason?: string) => void;
  acknowledgeProfileIntent: () => void;
  handleQueued: (payload: {
    id: string;
    prompt: string;
    createdAt: number;
  }) => void;
  handleProgress: (payload: {
    id: string;
    progress: number;
    status?: string;
  }) => void;
  handleCompleted: (payload: {
    id: string;
    variants: GenerationVariant[];
  }) => void;
  handleFailed: (payload: { id: string; error?: string }) => void;
}

const seedHistory: Generation[] = [
  {
    id: "seed-1",
    prompt:
      "Create a pop-rock song about old times, nostalgic opera theme style, guitar solo like Slash",
    status: "completed",
    progress: 100,
    createdAt: Date.now() - 1000 * 60 * 5,
    variants: [
      { title: "Crimson Echo", version: "v1", duration: 56 },
      { title: "Crimson Echo Pulse", version: "v2", duration: 61 },
    ],
  },
  {
    id: "seed-2",
    prompt:
      "Dreamy synthwave instrumental with neon atmosphere and soaring leads",
    status: "completed",
    progress: 100,
    createdAt: Date.now() - 1000 * 60 * 8,
    variants: [
      { title: "Neon Reverie", version: "v1", duration: 48 },
      { title: "Neon Reverie Night", version: "v2", duration: 52 },
    ],
  },
];

const INITIAL_CREDITS_USED = 480;
const CREDIT_CAP = 500;
const CREDITS_PER_GENERATION = 10;
const FEATURE_NOT_SUPPORTED_PROMPT = "test";
const FEATURE_NOT_SUPPORTED_MESSAGE =
  "Your request does not seem to relate to music or audio generation features. Please provide a prompt related to song creation, remixing, covers, or similar music tasks.";

function sortGenerations(list: Generation[]) {
  return [...list].sort((a, b) => b.createdAt - a.createdAt);
}

export const useGenerationStore = create<GenerationStore>((set, get) => ({
  generations: seedHistory,
  isSubmitting: false,
  isPaginating: false,
  socketConnected: false,
  lastError: undefined,
  lastErrorPrompt: undefined,
  lastErrorTitle: undefined,
  credits: INITIAL_CREDITS_USED,
  totalCredits: CREDIT_CAP,
  showInsufficient: false,
  insufficientReason: undefined,
  shouldOpenProfile: false,
  submitPrompt: async (prompt: string) => {
    const trimmed = prompt.trim();
    if (!trimmed) {
      return undefined;
    }

    if (trimmed.toLowerCase() === FEATURE_NOT_SUPPORTED_PROMPT) {
      set({
        lastError: FEATURE_NOT_SUPPORTED_MESSAGE,
        lastErrorPrompt: trimmed,
        lastErrorTitle: "Feature Not Supported",
        shouldOpenProfile: true,
      });
      return undefined;
    }

    const state = get();
    if (state.credits >= state.totalCredits) {
      state.triggerInsufficient(
        "You have reached your generation allotment. Top up to continue."
      );
      return undefined;
    }

    set({
      isSubmitting: true,
      lastError: undefined,
      lastErrorPrompt: undefined,
      lastErrorTitle: undefined,
    });

    try {
      const response = await fetch("/api/generate", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: trimmed }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data?.error ?? "Failed to start generation");
      }

      const id = data?.id as string | undefined;
      if (id) {
        get().debitCredits(CREDITS_PER_GENERATION);
      }
      return id;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Unexpected error";
      set({
        lastError: message,
        lastErrorPrompt: trimmed,
        lastErrorTitle: "Submission Error",
        shouldOpenProfile: true,
      });
      return undefined;
    } finally {
      set({ isSubmitting: false });
    }
  },
  loadMoreHistory: async () => {
    if (get().isPaginating) return;

    set({ isPaginating: true });
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const olderEntries: Generation[] = Array.from({ length: 2 }).map(
      (_, idx) => {
        const createdAt = Date.now() - 1000 * 60 * (12 + idx * 4);
        return {
          id: `historical-${createdAt}`,
          prompt: "AI chorus layered with orchestral swells",
          status: "completed",
          progress: 100,
          createdAt,
          variants: [
            { title: "Golden Choir", version: "v1", duration: 44 },
            { title: "Golden Choir Drift", version: "v2", duration: 47 },
          ],
        };
      }
    );

    set((state) => ({
      generations: sortGenerations([...state.generations, ...olderEntries]),
      isPaginating: false,
    }));
  },
  acknowledgeError: () =>
    set({
      lastError: undefined,
      lastErrorPrompt: undefined,
      lastErrorTitle: undefined,
    }),
  setSocketConnected: (next) => set({ socketConnected: next }),
  debitCredits: (amount: number) =>
    set((state) => {
      const nextCredits = Math.min(state.totalCredits, state.credits + amount);
      const exhausted = nextCredits >= state.totalCredits;
      return {
        credits: nextCredits,
        showInsufficient: exhausted ? true : state.showInsufficient,
        insufficientReason: exhausted
          ? "You just used the remaining credits. Top up to continue."
          : state.insufficientReason,
        shouldOpenProfile: exhausted ? true : state.shouldOpenProfile,
      };
    }),
  topUpCredits: () =>
    set((state) => {
      const fallback = Math.max(0, state.totalCredits - 20);
      return {
        credits: Math.min(fallback, INITIAL_CREDITS_USED),
        showInsufficient: false,
        insufficientReason: undefined,
        shouldOpenProfile: false,
      };
    }),
  dismissInsufficient: () =>
    set({ showInsufficient: false, insufficientReason: undefined }),
  triggerInsufficient: (reason) =>
    set((state) => ({
      showInsufficient: true,
      insufficientReason:
        reason ??
        state.insufficientReason ??
        "You are out of credits. Top up to keep the music coming.",
      shouldOpenProfile: true,
    })),
  acknowledgeProfileIntent: () => set({ shouldOpenProfile: false }),
  handleQueued: ({ id, prompt, createdAt }) => {
    set((state) => ({
      generations: sortGenerations([
        ...state.generations.filter((item) => item.id !== id),
        {
          id,
          prompt,
          createdAt,
          status: "queued",
          progress: 0,
          phaseLabel: "Queued",
          variants: [],
        },
      ]),
    }));
  },
  handleProgress: ({ id, progress, status }) => {
    set((state) => ({
      generations: state.generations.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "generating",
              progress,
              phaseLabel: status ?? "Generating",
            }
          : item
      ),
    }));
  },
  handleCompleted: ({ id, variants }) => {
    set((state) => ({
      generations: state.generations.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "completed",
              progress: 100,
              phaseLabel: "Rendered",
              variants,
              error: undefined,
            }
          : item
      ),
    }));
  },
  handleFailed: ({ id, error }) => {
    set((state) => ({
      generations: state.generations.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "failed",
              progress: 100,
              phaseLabel: "Failed",
              error: error ?? "Generation failed",
            }
          : item
      ),
    }));
  },
}));
