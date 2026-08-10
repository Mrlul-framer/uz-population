interface EmptyStateProps {
  onReset: () => void;
}

export function EmptyState({ onReset }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-line bg-surface px-6 py-16 text-center dark:border-line-dark dark:bg-surface-dark">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-teal-500/10 text-teal-500">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M3 3v18h18" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M7 14l4-4 3 3 5-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <p className="font-display text-lg font-medium text-ink-900 dark:text-ink-900-dark">
        No data in this range
      </p>
      <p className="mt-1 max-w-sm text-sm text-ink-500 dark:text-ink-500-dark">
        Try a wider period or reset the filter to see the full 1991-2026 dataset.
      </p>
      <button
        onClick={onReset}
        className="mt-5 rounded-lg border border-teal-500 px-4 py-2 text-sm font-medium text-teal-500 transition-colors hover:bg-teal-500 hover:text-white"
      >
        Reset filter
      </button>
    </div>
  );
}
