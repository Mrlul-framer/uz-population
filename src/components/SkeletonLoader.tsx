export function StatCardSkeleton() {
  return (
    <div className="rounded-xl border border-line bg-surface p-5 dark:border-line-dark dark:bg-surface-dark">
      <div className="h-3 w-20 animate-pulse rounded bg-line dark:bg-line-dark" />
      <div className="mt-3 h-7 w-28 animate-pulse rounded bg-line dark:bg-line-dark" />
      <div className="mt-2 h-2 w-16 animate-pulse rounded bg-line dark:bg-line-dark" />
    </div>
  );
}

export function ChartSkeleton() {
  return (
    <div className="rounded-xl border border-line bg-surface p-6 dark:border-line-dark dark:bg-surface-dark">
      <div className="h-5 w-48 animate-pulse rounded bg-line dark:bg-line-dark" />
      <div className="mt-6 h-80 w-full animate-pulse rounded bg-line dark:bg-line-dark" />
    </div>
  );
}

export function TableSkeleton() {
  return (
    <div className="rounded-xl border border-line bg-surface p-6 dark:border-line-dark dark:bg-surface-dark">
      <div className="h-5 w-32 animate-pulse rounded bg-line dark:bg-line-dark" />
      <div className="mt-4 space-y-2">
        {Array.from({ length: 6 }).map((_, index) => (
          <div key={index} className="h-6 w-full animate-pulse rounded bg-line dark:bg-line-dark" />
        ))}
      </div>
    </div>
  );
}
