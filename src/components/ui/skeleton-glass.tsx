import { cn } from "@/lib/utils";

function SkeletonBar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-md bg-sv-indigo/5 dark:bg-white/5",
        className
      )}
    >
      <div className="absolute inset-0 animate-[skeleton-shimmer_1.5s_ease-in-out_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className="skeleton-glass rounded-2xl p-5">
      <div className="flex items-start justify-between">
        <div className="space-y-3 flex-1">
          <SkeletonBar className="h-3 w-24" />
          <SkeletonBar className="h-8 w-16" />
        </div>
        <SkeletonBar className="h-10 w-10 rounded-xl" />
      </div>
    </div>
  );
}

export function SkeletonRow() {
  return (
    <div className="flex items-center gap-4 px-4 py-3 border-b border-sv-indigo/5 dark:border-white/5">
      <SkeletonBar className="h-4 w-32" />
      <SkeletonBar className="h-4 w-24" />
      <SkeletonBar className="h-4 w-20" />
      <SkeletonBar className="h-4 w-40 flex-1" />
      <SkeletonBar className="h-4 w-16" />
    </div>
  );
}

export function SkeletonTable({ rows = 5 }: { rows?: number }) {
  return (
    <div className="skeleton-glass rounded-2xl overflow-hidden">
      <div className="flex items-center gap-4 px-4 py-3 border-b border-sv-indigo/5 dark:border-white/5">
        <SkeletonBar className="h-3 w-20" />
        <SkeletonBar className="h-3 w-16" />
        <SkeletonBar className="h-3 w-12" />
        <SkeletonBar className="h-3 w-28 flex-1" />
        <SkeletonBar className="h-3 w-12" />
      </div>
      {Array.from({ length: rows }).map((_, i) => (
        <SkeletonRow key={i} />
      ))}
    </div>
  );
}

export { SkeletonBar };
