interface IconButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  variant?: "default" | "active" | "plain";
  disabled?: boolean;
  ariaLabel?: string;
}

export default function IconButton({
  children,
  onClick,
  className = "",
  variant = "default",
  disabled = false,
  ariaLabel,
}: IconButtonProps) {
  const variantClasses =
    variant === "active"
      ? "bg-bg-active hover:bg-bg-active-hover"
      : variant === "plain"
      ? "bg-transparent hover:opacity-80"
      : "bg-bg-quaternary hover:bg-bg-hover";

  const shapeClasses =
    variant === "plain"
      ? ""
      : "w-10 h-10 rounded-full border border-border-default";

  return (
    <button
      onClick={onClick}
      className={`${shapeClasses} opacity-100 transition-colors flex items-center justify-center ${variantClasses} ${className} ${
        disabled ? "opacity-40 cursor-not-allowed" : "cursor-pointer"
      }`}
      disabled={disabled}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
