// src/components/ui/Container.tsx
import { cn } from "./utils";

export default function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        // predictable, no plugin magic:
        "mx-auto w-full max-w-7xl px-4 lg:px-8",
        className
      )}
    >
      {children}
    </div>
  );
}
