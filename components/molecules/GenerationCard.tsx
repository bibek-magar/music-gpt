import Image from "next/image";

interface GenerationCardProps {
  progress: number;
  prompt: string;
  status: string;
  version: string;
}

export default function GenerationCard({
  progress,
  prompt,
  status,
  version,
}: GenerationCardProps) {
  const clampedProgress = Math.min(100, Math.max(0, Math.round(progress)));

  // Determine loader art by thresholds
  const getLoaderSrc = (p: number) => {
    if (p < 25) return "/icons/loader/0.svg";
    if (p < 50) return "/icons/loader/25.svg";
    if (p < 75) return "/icons/loader/50.svg";
    if (p < 90) return "/icons/loader/75.svg";
    if (p < 100) return "/icons/loader/90.svg";
    return "/icons/loader/100.svg";
  };

  const loaderSrc = getLoaderSrc(clampedProgress);
  const isLoading = clampedProgress < 100;
  const progressWidth = `${Math.max(0, Math.min(100, clampedProgress))}%`;

  return (
    <article className="relative rounded-2xl border border-white/5 bg-[#101217] overflow-hidden">
      {isLoading && (
        <div
          className="absolute inset-y-0 left-0 w-full pointer-events-none overflow-hidden"
          aria-hidden
        >
          <div
            className="h-full bg-[#1D2125] transition-[width] duration-500 ease-[cubic-bezier(.32,.72,0,1)]"
            style={{
              width: progressWidth,
              minWidth: clampedProgress > 0 ? "4%" : "0%",
            }}
          />
        </div>
      )}
      <div className="relative z-10 p-3 flex items-center gap-3">
        {/* Loader box with threshold-based SVG */}
        <div className="relative w-16 h-16 shrink-0 rounded-2xl overflow-hidden">
          <Image
            src={loaderSrc}
            alt="Loading"
            width={64}
            height={64}
            className="w-full h-full rounded-2xl"
            priority
          />
        </div>
        <div className="relative flex-1 min-w-0">
          <p
            className={`font-normal text-13 mb-0.5 truncate ${
              isLoading ? "text-glow" : "text-text-primary"
            }`}
          >
            {prompt}
          </p>
          <span
            className={`text-11 ${
              isLoading ? "text-glow-muted" : "text-text-muted"
            }`}
          >
            {status}
          </span>
        </div>
        <button className="relative shrink-0 px-2.5 py-1 bg-bg-quaternary/80 backdrop-blur rounded-full text-text-primary text-11 font-medium border border-border-default">
          {version}
        </button>
      </div>
    </article>
  );
}
