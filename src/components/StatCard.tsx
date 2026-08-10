interface StatCardProps {
  label: string;
  value: string;
  caption?: string;
  accent?: 'teal' | 'clay';
  delay?: number;
}

export function StatCard({ label, value, caption, accent = 'teal', delay = 0 }: StatCardProps) {
  const accentClass = accent === 'teal' ? 'text-teal-500 dark:text-teal-400' : 'text-clay-500 dark:text-clay-400';

  return (
    <div
      className="animate-rise rounded-xl border border-line bg-surface p-5 shadow-sm transition-shadow hover:shadow-md dark:border-line-dark dark:bg-surface-dark"
      style={{ animationDelay: `${delay}ms` }}
    >
      <p className="text-xs font-semibold uppercase tracking-wider text-ink-500 dark:text-ink-500-dark">
        {label}
      </p>
      <p className={`mt-2 font-mono text-2xl font-semibold ${accentClass} sm:text-3xl`}>{value}</p>
      {caption && <p className="mt-1 text-xs text-ink-300 dark:text-ink-500-dark">{caption}</p>}
    </div>
  );
}
