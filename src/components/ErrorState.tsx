
interface ErrorStateProps {
  message: string;
  onRetry: () => void;
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-danger-400/30 bg-danger-400/5 px-6 py-16 text-center dark:border-danger-500-dark/30 dark:bg-danger-500-dark/10">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-danger-500/10 text-danger-500 dark:text-danger-400-dark">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 9v4" strokeLinecap="round" />
          <path d="M12 17h.01" strokeLinecap="round" />
          <circle cx="12" cy="12" r="9" />
        </svg>
      </div>
      <p className="font-display text-lg font-medium text-ink-900 dark:text-ink-900-dark">
        Couldn't load population data
      </p>
      <p className="mt-1 max-w-sm text-sm text-ink-500 dark:text-ink-500-dark">{message}</p>
      <button
        onClick={onRetry}
        className="mt-5 rounded-lg bg-teal-500 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-teal-600"
      >
        Try again
      </button>
    </div>
  );
}
