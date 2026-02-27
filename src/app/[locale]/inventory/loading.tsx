import { SkeletonTable } from "@/components/ui/skeleton-glass";

export default function InventoryLoading() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="h-8 w-40 rounded-md bg-sv-indigo/5 dark:bg-white/5" />
        <div className="flex items-center gap-3">
          <div className="h-9 w-64 rounded-lg bg-sv-indigo/5 dark:bg-white/5" />
          <div className="h-9 w-28 rounded-lg bg-sv-indigo/5 dark:bg-white/5" />
        </div>
      </div>
      <SkeletonTable rows={8} />
    </div>
  );
}
