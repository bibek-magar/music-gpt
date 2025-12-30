import { AlertIcon } from "../atoms/ProfileIcons";

interface ServerBusyCardProps {
  queueCount: string;
  onRetry: () => void;
}

export default function ServerBusyCard({
  queueCount,
  onRetry,
}: ServerBusyCardProps) {
  return (
    <article className="bg-bg-quaternary/40 rounded-lg p-3">
      <div className="flex items-start gap-2">
        <AlertIcon className="shrink-0 text-red-500 w-5 h-5" />
        <div className="flex-1">
          <h3 className="text-red-500 font-medium text-13 mb-0.5">
            Oops! Server busy.
          </h3>
          <p className="text-text-muted text-11">
            {queueCount} users in the queue.{" "}
            <button
              onClick={onRetry}
              className="text-text-muted hover:text-text-primary underline transition-colors"
            >
              Retry
            </button>
          </p>
        </div>
      </div>
    </article>
  );
}
