import { SkeletonCard } from "@/components/ui/skeleton-glass";

export default function ProjectsLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="h-8 w-32 rounded-md bg-sv-indigo/5 dark:bg-white/5" />
        <div className="flex items-center gap-3">
          <div className="h-9 w-64 rounded-lg bg-sv-indigo/5 dark:bg-white/5" />
          <div className="h-9 w-28 rounded-lg bg-sv-indigo/5 dark:bg-white/5" />
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton-glass h-64 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
