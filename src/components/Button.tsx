import Link from "next/link";

const ctaClass =
  "inline-flex items-center justify-center rounded-lg bg-[#5A6E4E] px-6 py-3.5 font-sans text-sm font-semibold text-white transition-colors hover:bg-[#4A5E3E] min-h-[44px]";

export function Button({
  children,
  href,
  onClick,
  type = "button",
  disabled,
  className = "",
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
  className?: string;
}) {
  if (href) {
    return (
      <Link
        href={disabled ? "#" : href}
        className={`${ctaClass} ${disabled ? "cursor-not-allowed bg-[#3A3028]/30" : ""} ${className}`}
        aria-disabled={disabled}
      >
        {children}
      </Link>
    );
  }
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${ctaClass} ${disabled ? "cursor-not-allowed bg-[#3A3028]/30" : ""} ${className}`}
    >
      {children}
    </button>
  );
}
