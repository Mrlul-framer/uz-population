import { useState } from 'react';
import type { PresetRange, YearRange } from '../types/population';

interface FilterBarProps {
  preset: PresetRange;
  range: YearRange;
  bounds: YearRange;
  onPresetChange: (preset: Exclude<PresetRange, 'custom'>) => void;
  onCustomRangeChange: (range: YearRange) => void;
}

const PRESETS: { id: Exclude<PresetRange, 'custom'>; label: string }[] = [
  { id: '1991-2026', label: '1991-2026' },
  { id: '2000-2026', label: '2000-2026' },
  { id: '2010-2026', label: '2010-2026' },
];

export function FilterBar({ preset, range, bounds, onPresetChange, onCustomRangeChange }: FilterBarProps) {
  const [customStart, setCustomStart] = useState(range.start);
  const [customEnd, setCustomEnd] = useState(range.end);
  const [rangeError, setRangeError] = useState<string | null>(null);

  const applyCustomRange = () => {
    if (customStart >= customEnd) {
      setRangeError('Start year must be before end year');
      return;
    }
    if (customStart < bounds.start || customEnd > bounds.end) {
      setRangeError(`Choose years between ${bounds.start} and ${bounds.end}`);
      return;
    }
    setRangeError(null);
    onCustomRangeChange({ start: customStart, end: customEnd });
  };

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-line bg-surface p-4 dark:border-line-dark dark:bg-surface-dark sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2">
        {PRESETS.map((item) => (
          <button
            key={item.id}
            onClick={() => onPresetChange(item.id)}
            className={`rounded-full px-3.5 py-1.5 text-sm font-medium transition-colors ${
              preset === item.id
                ? 'bg-teal-500 text-white'
                : 'bg-teal-50 text-teal-600 hover:bg-teal-100 dark:bg-teal-500/10 dark:text-teal-400 dark:hover:bg-teal-500/20'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-2 sm:items-end">
        <div className="flex items-center gap-2">
          <label className="sr-only" htmlFor="custom-start">Start year</label>
          <input
            id="custom-start"
            type="number"
            value={customStart}
            min={bounds.start}
            max={bounds.end}
            onChange={(event) => setCustomStart(Number(event.target.value))}
            className="w-20 rounded-lg border border-line bg-paper px-2 py-1.5 text-sm text-ink-900 dark:border-line-dark dark:bg-paper-dark dark:text-ink-900-dark"
          />
          <span className="text-ink-300">-</span>
          <label className="sr-only" htmlFor="custom-end">End year</label>
          <input
            id="custom-end"
            type="number"
            value={customEnd}
            min={bounds.start}
            max={bounds.end}
            onChange={(event) => setCustomEnd(Number(event.target.value))}
            className="w-20 rounded-lg border border-line bg-paper px-2 py-1.5 text-sm text-ink-900 dark:border-line-dark dark:bg-paper-dark dark:text-ink-900-dark"
          />
          <button
            onClick={applyCustomRange}
            className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
              preset === 'custom'
                ? 'bg-clay-500 text-white hover:bg-clay-600'
                : 'bg-clay-500/10 text-clay-500 hover:bg-clay-500 hover:text-white'
            }`}
          >
            Custom
          </button>
        </div>
        {rangeError && <p className="text-xs text-clay-500">{rangeError}</p>}
      </div>
    </div>
  );
}
