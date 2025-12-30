import Image from "next/image";

interface CompletedSongCardProps {
  title: string;
  prompt: string;
  version: string;
  isLiked?: boolean;
  onPlay: () => void;
  onLike: () => void;
  onDislike: () => void;
  onMore: () => void;
  alwaysShowMore?: boolean;
}

export default function CompletedSongCard({
  title,
  prompt,
  version,
  isLiked = false,
  onPlay,
  onLike,
  onDislike,
  onMore,
  alwaysShowMore = false,
}: CompletedSongCardProps) {
  return (
    <article className="group relative flex items-center rounded-[999px] pl-2 pr-4 py-2 transition-colors cursor-pointer">
      <div className="relative w-[60px] h-[60px] mr-3 rounded-2xl overflow-hidden shrink-0 bg-linear-to-br from-[#35405a] via-[#243048] to-[#12141c]">
        <div className="absolute inset-0 bg-linear-to-br from-green-400/10 via-blue-400/20 to-purple-400/30" />
        <button
          onClick={onPlay}
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center"
          aria-label="Play preview"
        >
          <span className="w-11 h-11 rounded-full bg-white/10 border border-white/15 flex items-center justify-center">
            <Image
              src="/icons/hover-icon/play.svg"
              alt="Play preview"
              width={16}
              height={16}
            />
          </span>
        </button>
      </div>

      <div className="flex-1 min-w-0 relative pr-36">
        <h4 className="text-16 leading-[140%] text-shades-primary-5000 font-normal tracking-01 truncate">
          {title}
        </h4>
        <p className="text-14 leading-[160%] text-shades-primary-1100 tracking-01 truncate">
          {prompt}
        </p>
        <div
          className={`absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-2 text-text-muted transition-all duration-200 pointer-events-none ${
            alwaysShowMore
              ? "opacity-100"
              : "opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0"
          } group-hover:pointer-events-auto`}
        >
          <div
            className={`${
              alwaysShowMore
                ? "opacity-0 group-hover:opacity-100 group-hover:translate-x-0 translate-x-2"
                : ""
            } flex items-center gap-2 transition-all duration-200`}
          >
            <button
              onClick={onLike}
              className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors ${
                isLiked
                  ? "bg-white/10 border-white/30"
                  : "border-white/10 bg-white/0 hover:bg-white/5 hover:border-white/30"
              }`}
              aria-label={isLiked ? "Unlike generation" : "Like generation"}
            >
              <Image
                src="/icons/hover-icon/like.svg"
                alt={isLiked ? "Liked" : "Like"}
                width={16}
                height={16}
              />
            </button>
            <button
              onClick={onDislike}
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
              {version}
            </span>
          </div>
          <button
            onClick={onMore}
            className="w-10 h-10 rounded-full border border-white/10 bg-white/0 hover:bg-white/5 hover:border-white/30 flex items-center justify-center transition-colors pointer-events-auto"
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
    </article>
  );
}
