import { useMemo, useState } from 'react';
import type { PopulationPoint } from '../types/population';

interface DataTableProps {
  data: PopulationPoint[];
}

export function DataTable({ data }: DataTableProps) {
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const rows = useMemo(() => {
    const reversed = [...data].reverse();
    if (!search.trim()) return reversed;
    return reversed.filter((point) => String(point.year).includes(search.trim()));
  }, [data, search]);

  const previous = (index: number) => (index < rows.length - 1 ? rows[index + 1] : null);

  return (
    <div className="rounded-xl border border-line bg-surface dark:border-line-dark dark:bg-surface-dark">
      <button
        onClick={() => setIsOpen((open) => !open)}
        className="flex w-full items-center justify-between px-5 py-4 text-left"
      >
        <span className="font-display text-base font-medium text-ink-900 dark:text-ink-900-dark">
          Year-by-year data
        </span>
        <svg
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className={`text-ink-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {isOpen && (
        <div className="border-t border-line px-5 pb-5 dark:border-line-dark">
          <input
            type="text"
            placeholder="Search year..."
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="my-4 w-full max-w-xs rounded-lg border border-line bg-paper px-3 py-1.5 text-sm text-ink-900 dark:border-line-dark dark:bg-paper-dark dark:text-ink-900-dark"
          />
          <div className="max-h-80 overflow-y-auto rounded-lg border border-line dark:border-line-dark">
            <table className="w-full text-sm">
              <thead className="sticky top-0 bg-teal-50 text-ink-700 dark:bg-teal-500/10 dark:text-ink-500-dark">
                <tr>
                  <th className="px-4 py-2 text-left font-semibold">Year</th>
                  <th className="px-4 py-2 text-right font-semibold">Population</th>
                  <th className="px-4 py-2 text-right font-semibold">YoY Change</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((point, index) => {
                  const prev = previous(index);
                  const change = prev ? point.population - prev.population : null;
                  return (
                    <tr key={point.year} className="border-t border-line dark:border-line-dark">
                      <td className="px-4 py-2 font-mono text-ink-900 dark:text-ink-900-dark">{point.year}</td>
                      <td className="px-4 py-2 text-right font-mono text-ink-900 dark:text-ink-900-dark">
                        {new Intl.NumberFormat('en-US').format(point.population)}
                      </td>
                      <td className="px-4 py-2 text-right font-mono text-xs text-ink-500 dark:text-ink-500-dark">
                        {change !== null ? `+${new Intl.NumberFormat('en-US').format(change)}` : '-'}
                      </td>
                    </tr>
                  );
                })}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={3} className="px-4 py-6 text-center text-ink-300">
                      No matching years
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
