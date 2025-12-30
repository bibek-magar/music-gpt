// PromptInput.tsx
"use client";

import { useEffect, useState } from "react";
import IconButton from "../atoms/IconButton";
import ActionButton from "../atoms/ActionButton";
import {
  AttachmentIcon,
  ControlsIcon,
  InstrumentalIcon,
  AddIcon,
  SendIcon,
} from "../atoms/Icons";
import PromptGlowBackground from "../atoms/PromptGlowBackground";
import { useGenerationStore } from "@/store/useGenerationStore";

const PLACEHOLDER_PROMPTS = [
  "Epic cinematic trailer with haunting choir",
  "Dark techno beat inspired by Berlin clubs",
  "Warm lofi lullaby with vinyl crackle",
  "Anime opening theme with explosive guitars",
];

const EXAMPLE_PROMPTS = [
  "Epic cinematic trailer with haunting choir",
  "Dark techno beat inspired by Berlin clubs",
  "Warm lofi lullaby with vinyl crackle",
  "Anime opening theme with explosive guitars",
  "Upbeat funk track with slap bass and brass section",
  "Ethereal ambient soundscape for meditation",
  "Heavy metal riff with double kick drum",
  "Smooth jazz piano trio in a smoky bar",
  "Retro 80s synthwave with driving bassline",
  "Acoustic folk song with fingerstyle guitar",
  "Orchestral symphony building to a climax",
  "Minimalist house beat with deep sub bass",
];

const MAX_CHARACTERS = 280;

const GLOW_IMAGES = [
  "/icons/prompt-input/first.svg",
  "/icons/prompt-input/second.svg",
  "/icons/prompt-input/third.svg",
] as const;

export default function PromptInput() {
  const [prompt, setPrompt] = useState("");
  const [placeholderIndex, setPlaceholderIndex] = useState(0);
  const [typedPlaceholder, setTypedPlaceholder] = useState(
    PLACEHOLDER_PROMPTS[0]
  );
  const [isFocused, setIsFocused] = useState(false);

  const submitPrompt = useGenerationStore((state) => state.submitPrompt);
  const isSubmitting = useGenerationStore((state) => state.isSubmitting);
  const lastError = useGenerationStore((state) => state.lastError);
  const acknowledgeError = useGenerationStore(
    (state) => state.acknowledgeError
  );

  const isPromptValid =
    prompt.trim().length > 0 && prompt.length <= MAX_CHARACTERS;
  const submitIconClass = isPromptValid ? "opacity-100" : "opacity-40";

  useEffect(() => {
    const cycleTimer = setInterval(() => {
      setPlaceholderIndex((prev) => (prev + 1) % PLACEHOLDER_PROMPTS.length);
    }, 6000);
    return () => clearInterval(cycleTimer);
  }, []);

  useEffect(() => {
    let charIndex = 0;
    const currentPrompt = PLACEHOLDER_PROMPTS[placeholderIndex];

    const resetFrame = requestAnimationFrame(() => setTypedPlaceholder(""));

    const typer = setInterval(() => {
      charIndex += 1;
      setTypedPlaceholder(currentPrompt.slice(0, charIndex));
      if (charIndex >= currentPrompt.length) clearInterval(typer);
    }, 32);

    return () => {
      cancelAnimationFrame(resetFrame);
      clearInterval(typer);
    };
  }, [placeholderIndex]);

  useEffect(() => {
    if (!lastError) return;
    const timer = setTimeout(() => acknowledgeError(), 4000);
    return () => clearTimeout(timer);
  }, [lastError, acknowledgeError]);

  const handleSubmit = async () => {
    if (!isPromptValid || isSubmitting) return;
    const id = await submitPrompt(prompt);
    if (id) setPrompt("");
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
      event.preventDefault();
      handleSubmit();
    }
  };

  const handleExampleClick = () => {
    const randomPrompt =
      EXAMPLE_PROMPTS[Math.floor(Math.random() * EXAMPLE_PROMPTS.length)];
    setPrompt(randomPrompt);
  };

  return (
    <div className="flex flex-col items-center w-full">
      <h1 className="text-text-primary text-[32px] font-semibold mb-7.5 text-center">
        What Song to Create?
      </h1>

      <div className="relative isolate z-0 w-full max-w-200 mb-6 overflow-visible">
        <PromptGlowBackground
          images={GLOW_IMAGES}
          radiusPx={32}
          thicknessPx={16}
          thicknessHorizontalPx={10}
          durationMs={1800}
          className="-z-10"
        />

        <div
          className={`relative rounded-32 border border-white/5 bg-[#1c1e24] p-0.5 transition-all duration-500 ${
            isFocused ? "scale-[1.01]" : "scale-100"
          }`}
        >
          <div className="w-full h-full bg-bg-tertiary rounded-32 px-8 py-4">
            <div className="mb-4">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={handleKeyDown}
                placeholder={typedPlaceholder}
                maxLength={MAX_CHARACTERS + 20}
                className="w-full bg-transparent text-text-primary text-16 font-normal leading-normal resize-none outline-none placeholder:text-text-muted min-h-[40px] transition-all duration-300"
                rows={2}
              />
            </div>
            <div className="mt-2 flex flex-wrap items-center justify-between gap-3 text-13">
              <div className="flex items-center gap-3">
                <IconButton ariaLabel="Attach" onClick={() => {}}>
                  <AttachmentIcon />
                </IconButton>
                <IconButton ariaLabel="Controls" onClick={() => {}}>
                  <ControlsIcon />
                </IconButton>
                <IconButton ariaLabel="Instrumental" onClick={() => {}}>
                  <InstrumentalIcon />
                </IconButton>
                <ActionButton onClick={() => {}} className="pl-3 pr-4">
                  <AddIcon />
                  <span className="text-white">Lyrics</span>
                </ActionButton>
              </div>

              <div className="flex items-center gap-3">
                <ActionButton variant="dropdown" onClick={() => {}}>
                  <span className="text-white">Tools</span>
                </ActionButton>
                <IconButton
                  ariaLabel="Submit"
                  onClick={handleSubmit}
                  variant={isPromptValid ? "plain" : "plain"}
                  disabled={!isPromptValid || isSubmitting}
                >
                  <SendIcon
                    className={`transition-all duration-200 ${submitIconClass}`}
                  />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="text-center text-text-muted text-[12px]">
        MusicGPT v6 Pro - Our latest AI audio model{" "}
        <button
          onClick={handleExampleClick}
          className="underline hover:text-text-primary transition-colors ml-3"
        >
          Example prompts
        </button>
      </div>
    </div>
  );
}
