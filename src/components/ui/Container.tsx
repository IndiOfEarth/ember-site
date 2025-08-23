import { cn } from "./utils";
export default function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("container max-w-7xl", className)}>{children}</div>;
}
