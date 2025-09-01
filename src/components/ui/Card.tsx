import { cn } from "./utils";
export default function Card({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return <div className={cn("card p-6", className)}>{children}</div>;
}
