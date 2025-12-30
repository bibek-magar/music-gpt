interface ActionButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "dropdown";
  className?: string;
  disabled?: boolean;
}

export default function ActionButton({
  children,
  onClick,
  variant = "default",
  className = "",
  disabled = false,
}: ActionButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`h-10 rounded-full border border-border-default bg-bg-quaternary hover:bg-bg-hover transition-colors flex items-center gap-1.5 py-2 px-4 opacity-100 ${className} ${
        disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
      }`}
    >
      {children}
      {variant === "dropdown" && (
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="text-icon-default"
        >
          <path
            d="M4 6L8 10L12 6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      )}
    </button>
  );
}
