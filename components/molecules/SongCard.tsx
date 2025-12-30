interface SongCardProps {
  title: string;
  prompt: string;
  version: string;
}

export default function SongCard({ title, prompt, version }: SongCardProps) {
  return (
    <article className="bg-bg-quaternary/40 rounded-lg p-3 flex items-center gap-3">
      <div className="w-10 h-10 bg-bg-quaternary rounded-lg animate-pulse shrink-0" />
      <div className="flex-1 min-w-0">
        <h4 className="text-text-primary font-normal text-13 mb-0.5 truncate">
          {title}
        </h4>
        <p className="text-text-muted text-11 truncate">{prompt}</p>
      </div>
      <button className="shrink-0 px-2.5 py-1 bg-bg-quaternary rounded-full text-text-primary text-11 font-medium border border-border-default">
        {version}
      </button>
    </article>
  );
}
