import Link from "next/link";
import { cn } from "./utils";

type CTAButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "secondary" | "outline";
};

const sizeStyles = {
  sm: "px-8 py-3 text-xs",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

const variantStyles = {
  primary:
    "bg-ember-200 rounded-full text-ember-100 font-semibold border border-ember-900/50 hover:border-ember-100/50",
  secondary:
    "bg-white/5 text-white border border-white/10 hover:border-ember-500/50 backdrop-blur",
  outline:
    "bg-transparent text-white border border-white/20 hover:border-ember-500/50",
};

export default function CTAButton({
  href,
  children,
  className,
  size = "md",
  variant = "primary",
}: CTAButtonProps) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-medium shadow-glow hover:brightness-110 active:translate-y-[1px] transition",
        sizeStyles[size],
        variantStyles[variant],
        className
      )}
    >
      {children}
    </Link>
  );
}
