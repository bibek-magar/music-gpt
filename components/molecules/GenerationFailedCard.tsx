import { AlertIcon } from "../atoms/ProfileIcons";

interface GenerationFailedCardProps {
  prompt: string;
  error?: string;
  onRetry?: () => void;
}

export default function GenerationFailedCard({
  prompt,
  error,
  onRetry,
}: GenerationFailedCardProps) {
  return (
    <article className="rounded-2xl border border-border-default/40 bg-bg-tertiary/60 p-4 flex items-start gap-3">
      <div className="w-12 h-12 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0">
        <AlertIcon className="text-red-400 w-5 h-5" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-text-primary text-16 font-medium mb-1 truncate">
          Render interrupted
        </p>
        <p className="text-text-muted text-13 mb-2 line-clamp-2">{prompt}</p>
        <p className="text-text-muted text-12 mb-3">
          {error ?? "Something went wrong. Try submitting again."}
        </p>
        {onRetry && (
          <button
            onClick={onRetry}
            className="text-text-primary text-12 font-semibold underline hover:text-white transition-colors"
          >
            Retry
          </button>
        )}
      </div>
    </article>
  );
}
