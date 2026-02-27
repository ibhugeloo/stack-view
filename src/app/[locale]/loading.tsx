import { SkeletonCard } from "@/components/ui/skeleton-glass";

export default function DashboardLoading() {
  return (
    <div className="space-y-8">
      <div className="h-8 w-48 rounded-md bg-sv-indigo/5 dark:bg-white/5" />
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <SkeletonCard key={i} />
        ))}
      </div>
      <div className="h-6 w-32 rounded-md bg-sv-indigo/5 dark:bg-white/5" />
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="skeleton-glass h-48 rounded-2xl" />
        ))}
      </div>
    </div>
  );
}
