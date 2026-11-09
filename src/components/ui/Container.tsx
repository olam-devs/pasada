import { cn } from "@/lib/cn";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-site px-5 sm:px-8 lg:px-12 2xl:px-20",
        className,
      )}
    >
      {children}
    </div>
  );
}
