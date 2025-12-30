function ShimmerBlock({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative overflow-hidden bg-bg-quaternary/25 ${className}`}
    >
      <span
        aria-hidden
        className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-80"
        style={{ animation: "shimmer 1.5s linear infinite" }}
      />
    </div>
  );
}

export default function RecentGenerationSkeleton() {
  return (
    <div className="flex items-center gap-3 pl-2 pr-4 py-2 rounded-[999px]">
      <ShimmerBlock className="w-[60px] h-[60px] rounded-2xl shrink-0" />

      <div className="flex-1 flex items-center gap-4 min-w-0">
        <div className="flex-1 min-w-0 space-y-1.5">
          <ShimmerBlock className="h-[22px] w-1/2 rounded-full" />
          <ShimmerBlock className="h-[20px] w-3/4 rounded-full" />
        </div>

        <div className="flex items-center gap-2">
          <ShimmerBlock className="w-10 h-10 rounded-full" />
          <ShimmerBlock className="w-10 h-10 rounded-full" />
          <ShimmerBlock className="h-9 w-[52px] rounded-full" />
          <ShimmerBlock className="w-10 h-10 rounded-full" />
        </div>
      </div>
    </div>
  );
}
