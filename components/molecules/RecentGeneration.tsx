import Image from "next/image";

interface RecentGenerationProps {
  title?: string;
  prompt?: string;
  className?: string;
  version?: string;
  duration?: number;
}

export default function RecentGeneration({
  title = "Don't look back in anger, Sally",
  prompt = "Create a pop-rock song about old times, nostalgic opera theme style, guitar solo like slash, powerful female vocals",
  className = "",
  version = "v1",
  duration: _duration,
}: RecentGenerationProps) {
  const versionLabel = version ?? "v1";

  return (
    <div
      className={`group relative flex items-center rounded-[999px] pl-2 pr-4 py-2 transition-colors cursor-pointer ${className}`}
    >
      <div className="relative w-[60px] h-[60px] mr-3 rounded-2xl overflow-hidden shrink-0 bg-linear-to-br from-[#35405a] via-[#243048] to-[#12141c]">
        <div className="absolute inset-0 bg-linear-to-br from-green-400/10 via-blue-400/20 to-purple-400/30" />
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
          <span className="w-11 h-11 rounded-full bg-white/10 border border-white/15 flex items-center justify-center">
            <Image
              src="/icons/hover-icon/play.svg"
              alt="Play preview"
              width={16}
              height={16}
            />
          </span>
        </div>
      </div>

      <div className="flex-1 flex items-center min-w-0">
        <div className="flex-1 min-w-0">
          <h3 className="text-16 leading-[140%] text-shades-primary-5000 font-normal tracking-01 mb-1 truncate">
            {title}
          </h3>
          <p className="text-14 leading-[160%] text-shades-primary-1100 tracking-01 truncate">
            {prompt}
          </p>
        </div>

        <div className="ml-4 flex items-center gap-2 text-text-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2 transition-all duration-200 pointer-events-none group-hover:pointer-events-auto">
          <button
            className="w-10 h-10 rounded-full border border-white/10 bg-white/0 hover:bg-white/5 hover:border-white/30 flex items-center justify-center transition-colors"
            aria-label="Like generation"
          >
            <Image
              src="/icons/hover-icon/like.svg"
              alt="Like"
              width={16}
              height={16}
            />
          </button>
          <button
            className="w-10 h-10 rounded-full border border-white/10 bg-white/0 hover:bg-white/5 hover:border-white/30 flex items-center justify-center transition-colors"
            aria-label="Dislike generation"
          >
            <Image
              src="/icons/hover-icon/dislike.svg"
              alt="Dislike"
              width={16}
              height={16}
            />
          </button>
          <span className="px-3 py-1 rounded-full border border-white/10 text-text-primary text-13 font-medium">
            {versionLabel}
          </span>
          <button
            className="w-10 h-10 rounded-full border border-white/10 bg-white/0 hover:bg-white/5 hover:border-white/30 flex items-center justify-center transition-colors"
            aria-label="More options"
          >
            <Image
              src="/icons/hover-icon/three-dot.svg"
              alt="More options"
              width={16}
              height={16}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
