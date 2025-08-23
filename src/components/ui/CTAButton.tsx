import Link from "next/link";
import { cn } from "./utils";

export default function CTAButton({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-5 py-3 font-medium bg-ember-500 text-white shadow-glow hover:brightness-110 active:translate-y-[1px] transition",
        className
      )}
    >
      {children}
    </Link>
  );
}
