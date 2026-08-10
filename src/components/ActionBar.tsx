import { useTheme } from '../context/ThemeContext';

interface ActionBarProps {
  onExportPdf: () => void;
  onExportCsv: () => void;
  isExportingPdf: boolean;
}

export function ActionBar({ onExportPdf, onExportCsv, isExportingPdf }: ActionBarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onExportCsv}
        className="hidden items-center gap-1.5 rounded-lg border border-line px-3 py-2 text-sm font-medium text-ink-700 transition-colors hover:bg-teal-50 dark:border-line-dark dark:text-ink-500-dark dark:hover:bg-teal-500/10 sm:flex"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3v12" strokeLinecap="round" />
          <path d="M7 10l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M4 20h16" strokeLinecap="round" />
        </svg>
        CSV
      </button>

      <button
        onClick={onExportPdf}
        disabled={isExportingPdf}
        className="flex items-center gap-1.5 rounded-lg bg-teal-500 px-3.5 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-teal-600 disabled:cursor-wait disabled:opacity-70"
      >
        {isExportingPdf ? (
          <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M12 3v12" strokeLinecap="round" />
            <path d="M7 10l5 5 5-5" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M4 20h16" strokeLinecap="round" />
          </svg>
        )}
        {isExportingPdf ? 'Generating...' : 'Download PDF'}
      </button>

      <button
        onClick={toggleTheme}
        aria-label="Toggle dark mode"
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-line text-ink-700 transition-colors hover:bg-teal-50 dark:border-line-dark dark:text-ink-500-dark dark:hover:bg-teal-500/10"
      >
        {theme === 'light' ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="4" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" strokeLinecap="round" />
          </svg>
        )}
      </button>
    </div>
  );
}
