"use client";

import { useEffect, useState } from "react";
import ProfileHeader from "../molecules/ProfileHeader";
import CreditsSection from "../molecules/CreditsSection";
import GenerationCard from "../molecules/GenerationCard";
import CompletedSongCard from "../molecules/CompletedSongCard";
import SongCard from "../molecules/SongCard";
import GenerationFailedCard from "../molecules/GenerationFailedCard";
import InsufficientCreditsCard from "../molecules/InsufficientCreditsCard";
import InvalidPromptCard from "../molecules/InvalidPromptCard";
import { useGenerationStore } from "@/store/useGenerationStore";

interface ProfilePopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ProfilePopup({ isOpen, onClose }: ProfilePopupProps) {
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});
  const [isMounted, setIsMounted] = useState(isOpen);
  const [animationState, setAnimationState] = useState<"enter" | "exit">(
    isOpen ? "enter" : "exit"
  );
  const generations = useGenerationStore((state) => state.generations);
  const isPaginating = useGenerationStore((state) => state.isPaginating);
  const credits = useGenerationStore((state) => state.credits);
  const totalCredits = useGenerationStore((state) => state.totalCredits);
  const topUpCredits = useGenerationStore((state) => state.topUpCredits);
  const showInsufficient = useGenerationStore(
    (state) => state.showInsufficient
  );
  const insufficientReason = useGenerationStore(
    (state) => state.insufficientReason
  );
  const dismissInsufficient = useGenerationStore(
    (state) => state.dismissInsufficient
  );
  const lastError = useGenerationStore((state) => state.lastError);
  const lastErrorPrompt = useGenerationStore((state) => state.lastErrorPrompt);
  const lastErrorTitle = useGenerationStore((state) => state.lastErrorTitle);
  const acknowledgeError = useGenerationStore(
    (state) => state.acknowledgeError
  );
  const submitPrompt = useGenerationStore((state) => state.submitPrompt);

  const generating = generations.filter(
    (item) => item.status === "queued" || item.status === "generating"
  );
  const failed = generations.filter((item) => item.status === "failed");
  const completedVariants = generations
    .filter((item) => item.status === "completed")
    .flatMap((item) =>
      item.variants.map((variant) => ({
        generationId: item.id,
        prompt: item.prompt,
        ...variant,
      }))
    )
    .slice(0, 5);

  const hasAnyState =
    generating.length > 0 || failed.length > 0 || completedVariants.length > 0;

  const remainingCredits = Math.max(0, totalCredits - credits);

  const handleTopUp = () => {
    topUpCredits();
    dismissInsufficient();
  };

  const handleRetryInvalid = async () => {
    if (!lastErrorPrompt) return;
    acknowledgeError();
    await submitPrompt(lastErrorPrompt);
  };

  const handleCopyInvalid = () => {
    if (!lastErrorPrompt) return;
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(lastErrorPrompt).catch(() => undefined);
    }
  };

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      if (isOpen) {
        setIsMounted(true);
        setAnimationState("enter");
      } else {
        setAnimationState("exit");
      }
    });

    const timeout = !isOpen
      ? window.setTimeout(() => setIsMounted(false), 700)
      : undefined;

    return () => {
      window.cancelAnimationFrame(frame);
      if (timeout) window.clearTimeout(timeout);
    };
  }, [isOpen]);

  if (!isMounted) return null;

  const isEntering = animationState === "enter";
  const panelAnimation = isEntering
    ? "profile-popup-enter"
    : "profile-popup-exit";
  const backdropAnimation = isEntering
    ? "profile-backdrop-enter"
    : "profile-backdrop-exit";

  return (
    <>
      <div
        className={`fixed inset-0 z-40 ${backdropAnimation} ${
          isOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        onClick={onClose}
      />

      <aside
        className={`fixed top-20 right-6 z-50 w-[420px] max-h-[calc(100vh-120px)] rounded-2xl overflow-hidden shadow-[0_30px_60px_rgba(0,0,0,0.45)] transform-gpu will-change-transform ${panelAnimation}`}
        role="complementary"
        aria-label="User profile and activity"
      >
        <div className="absolute inset-0 rounded-2xl bg-gradient-orange p-px">
          <div className="w-full h-full bg-bg-primary rounded-2xl" />
        </div>

        <div className="relative h-full overflow-y-auto scrollbar-lux p-4">
          <ProfileHeader username="Johnny" handle="johnny" initial="J" />

          <CreditsSection
            current={credits}
            total={totalCredits}
            onTopUp={handleTopUp}
          />

          {/* Divider */}
          <div
            className="w-full mb-4"
            style={{
              borderTop: "1px solid var(--Shades-Primary-400, #303438)",
            }}
          />

          <section className="space-y-4 pb-6">
            {lastError && (
              <InvalidPromptCard
                title={lastErrorTitle ?? "Invalid Prompt"}
                prompt={lastErrorPrompt ?? "Previous prompt"}
                message={lastError}
                onDismiss={acknowledgeError}
                onRetry={lastErrorPrompt ? handleRetryInvalid : undefined}
                onCopy={lastErrorPrompt ? handleCopyInvalid : undefined}
              />
            )}

            {showInsufficient && (
              <InsufficientCreditsCard
                balance={remainingCredits}
                message={insufficientReason}
                onTopUp={handleTopUp}
                onClose={dismissInsufficient}
              />
            )}

            {!hasAnyState && (
              <div className="rounded-xl border border-border-default/30 p-4 text-center">
                <p className="text-text-primary text-14 font-semibold mb-1">
                  Your canvas is clear
                </p>
                <p className="text-text-muted text-12">
                  Submit a prompt and generations will appear here instantly.
                </p>
              </div>
            )}

            {generating.map((item) => (
              <GenerationCard
                key={`${item.id}-profile`}
                progress={item.progress}
                prompt={item.prompt}
                status={item.phaseLabel ?? "Generating"}
                version={item.variants[0]?.version ?? "v1"}
              />
            ))}

            {failed.map((item) => (
              <GenerationFailedCard
                key={`${item.id}-failed-profile`}
                prompt={item.prompt}
                error={item.error}
                onRetry={() => console.log("Retry generation", item.id)}
              />
            ))}

            {completedVariants.map((variant) => {
              const likeKey = `${variant.generationId}-${variant.version}`;
              const isLiked = likedMap[likeKey] ?? false;
              return (
                <CompletedSongCard
                  key={likeKey}
                  title={variant.title}
                  prompt={variant.prompt}
                  version={variant.version}
                  isLiked={isLiked}
                  onPlay={() => console.log("Play", variant.title)}
                  onLike={() =>
                    setLikedMap((prev) => ({
                      ...prev,
                      [likeKey]: !isLiked,
                    }))
                  }
                  onDislike={() => console.log("Dislike", variant.title)}
                  onMore={() => console.log("More", variant.title)}
                  alwaysShowMore
                />
              );
            })}

            {isPaginating && (
              <SongCard
                title="Fetching more"
                prompt="Please wait"
                version="--"
              />
            )}
          </section>
        </div>
      </aside>
    </>
  );
}
