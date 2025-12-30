"use client";

import GenerationCard from "../molecules/GenerationCard";
import RecentGeneration from "../molecules/RecentGeneration";
import RecentGenerationSkeleton from "../molecules/RecentGenerationSkeleton";
import GenerationFailedCard from "../molecules/GenerationFailedCard";
import { useGenerationStore } from "@/store/useGenerationStore";

function EmptyState() {
  return (
    <div className="rounded-2xl border border-border-default/30 p-6 text-center bg-bg-tertiary/30">
      <p className="text-text-primary text-18 font-semibold mb-1">
        Nothing here yet
      </p>
      <p className="text-text-muted text-14">
        Submit a prompt to watch your generations flow in real time.
      </p>
    </div>
  );
}

export default function RecentGenerationsPanel() {
  const generations = useGenerationStore((state) => state.generations);
  const isPaginating = useGenerationStore((state) => state.isPaginating);
  const loadMoreHistory = useGenerationStore((state) => state.loadMoreHistory);

  const hasGenerations = generations.length > 0;

  return (
    <section className="relative z-10 px-8 pb-8">
      <div className="w-full max-w-4xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-text-primary text-24 font-bold leading-[150%] tracking-[0.01em]">
            Recent generations
          </h2>
          <button
            onClick={loadMoreHistory}
            disabled={isPaginating}
            className={`text-13 font-medium underline-offset-4 underline transition-opacity ${
              isPaginating
                ? "opacity-40 cursor-not-allowed"
                : "hover:opacity-70"
            }`}
          >
            {isPaginating ? "Loading" : "Load history"}
          </button>
        </div>

        {!hasGenerations ? (
          <EmptyState />
        ) : (
          <div className="space-y-4">
            {generations.map((generation) => {
              if (
                generation.status === "completed" &&
                generation.variants.length
              ) {
                return generation.variants.map((variant) => (
                  <RecentGeneration
                    key={`${generation.id}-${variant.version}`}
                    title={variant.title}
                    prompt={generation.prompt}
                    version={variant.version}
                    duration={variant.duration}
                  />
                ));
              }

              if (generation.status === "failed") {
                return (
                  <GenerationFailedCard
                    key={`${generation.id}-failed`}
                    prompt={generation.prompt}
                    error={generation.error}
                  />
                );
              }

              return (
                <GenerationCard
                  key={`${generation.id}-progress`}
                  progress={generation.progress}
                  prompt={generation.prompt}
                  status={generation.phaseLabel ?? "Generating"}
                  version={generation.variants[0]?.version ?? "v1"}
                />
              );
            })}

            {isPaginating && (
              <>
                <RecentGenerationSkeleton />
                <RecentGenerationSkeleton />
              </>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
