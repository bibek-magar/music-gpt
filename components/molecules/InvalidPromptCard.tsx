interface InvalidPromptCardProps {
  prompt: string;
  message: string;
  title?: string;
  onDismiss?: () => void;
  onRetry?: () => void;
  onCopy?: () => void;
}

export default function InvalidPromptCard({
  prompt,
  message,
  title = "Invalid Prompt",
  onDismiss,
  onRetry,
  onCopy,
}: InvalidPromptCardProps) {
  const showActions = Boolean(onRetry || onCopy);

  return (
    <article className="relative bg-[#1d1f24] rounded-2xl p-4 flex gap-3 border border-white/10 shadow-[0_15px_40px_rgba(0,0,0,0.45)]">
      {onDismiss && (
        <button
          onClick={onDismiss}
          aria-label="Dismiss error"
          className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-white/10 text-white/70 text-sm hover:bg-white/20 transition-colors"
        >
          ×
        </button>
      )}
      <div className="shrink-0 w-14 h-14 rounded-xl bg-linear-to-br from-yellow-500/30 to-orange-500/30 flex items-center justify-center text-2xl">
        🥲
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-text-primary font-semibold text-14 mb-1">
          {title}
        </h3>
        <p className="text-text-secondary text-12 mb-1 truncate">{prompt}</p>
        <p className="text-text-muted text-12 leading-5">{message}</p>

        {showActions && (
          <div className="mt-3 flex flex-wrap gap-2">
            {onRetry && (
              <button
                onClick={onRetry}
                className="px-3 py-1.5 rounded-full border border-white/20 text-text-primary text-12 font-semibold hover:bg-white/10 transition-colors"
              >
                Retry
              </button>
            )}
            {onCopy && (
              <button
                onClick={onCopy}
                className="px-3 py-1.5 rounded-full border border-white/10 text-text-secondary text-12 hover:text-text-primary transition-colors"
              >
                Copy Prompt
              </button>
            )}
          </div>
        )}
      </div>
    </article>
  );
}
