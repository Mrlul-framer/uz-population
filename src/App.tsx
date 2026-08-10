import { useRef, useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { usePopulationData } from './hooks/usePopulationData';
import { useUrlFilterState } from './hooks/useUrlFilterState';
import { StatCard } from './components/StatCard';
import { StatCardSkeleton, ChartSkeleton, TableSkeleton } from './components/SkeletonLoader';
import { ErrorState } from './components/ErrorState';
import { EmptyState } from './components/EmptyState';
import { FilterBar } from './components/FilterBar';
import { PopulationChart } from './components/PopulationChart';
import { DataTable } from './components/DataTable';
import { ActionBar } from './components/ActionBar';
import { downloadPopulationCsv } from './utils/csvExport';

function formatNumber(value: number): string {
  return new Intl.NumberFormat('en-US').format(Math.round(value));
}

function DashboardContent() {
  const { preset, range, setPreset, setCustomRange } = useUrlFilterState();
  const { isLoading, error, filteredData, stats, bounds, reload } = usePopulationData(range);
  const [isExportingPdf, setIsExportingPdf] = useState(false);
  const exportRef = useRef<HTMLDivElement>(null);

  const handleExportPdf = async () => {
    if (!exportRef.current || !stats) return;
    setIsExportingPdf(true);
    try {
      const { exportDashboardToPdf } = await import('./utils/pdfExport');
      await exportDashboardToPdf(exportRef.current, stats, range);
    } catch (err) {
      console.error('PDF export failed', err);
    } finally {
      setIsExportingPdf(false);
    }
  };

  const handleExportCsv = () => {
    downloadPopulationCsv(filteredData, `uzbekistan-population-${range.start}-${range.end}.csv`);
  };

  return (
    <div className="min-h-screen bg-paper text-ink-900 dark:bg-paper-dark dark:text-ink-900-dark">
      <div className="tile-rule h-1.5 w-full" />

      <header className="border-b border-line bg-surface/80 backdrop-blur dark:border-line-dark dark:bg-surface-dark/80">
        <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div>
            <p className="font-mono text-xs uppercase tracking-widest text-teal-500 dark:text-teal-400">Analytics Dashboard</p>
            <h1 className="font-display text-2xl font-semibold tracking-tight text-ink-900 dark:text-ink-900-dark sm:text-3xl">
              Uzbekistan Poplation Dynamics
            </h1>
            <p className="mt-1 text-sm text-ink-500 dark:text-ink-500-dark">1991 - 2026 growth overview</p>
          </div>
          {!isLoading && !error && stats && (
            <ActionBar
              onExportPdf={handleExportPdf}
              onExportCsv={handleExportCsv}
              isExportingPdf={isExportingPdf}
            />
          )}
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
        {error && <ErrorState message={error} onRetry={reload} />}

        {!error && isLoading && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <StatCardSkeleton key={index} />
              ))}
            </div>
            <ChartSkeleton />
            <TableSkeleton />
          </div>
        )}

        {!error && !isLoading && bounds && (
          <div className="space-y-6">
            <FilterBar
              preset={preset}
              range={range}
              bounds={bounds}
              onPresetChange={setPreset}
              onCustomRangeChange={setCustomRange}
            />

            {filteredData.length === 0 || !stats ? (
              <EmptyState onReset={() => setPreset('1991-2026')} />
            ) : (
              <div ref={exportRef} className="space-y-6 bg-paper dark:bg-paper-dark">
                <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                  <StatCard
                    label="Population"
                    value={formatNumber(stats.currentPopulation)}
                    caption={`As of ${stats.currentYear}`}
                    delay={0}
                  />
                  <StatCard
                    label="Initial Population"
                    value={formatNumber(stats.initialPopulation)}
                    caption={`In ${stats.initialYear}`}
                    delay={60}
                  />
                  <StatCard
                    label="Total Growth"
                    value={`+${formatNumber(stats.totalGrowth)}`}
                    caption="People added"
                    delay={120}
                  />
                  <StatCard
                    label="Growth %"
                    value={`${stats.growthPercent.toFixed(1)}%`}
                    caption={`Since ${stats.initialYear}`}
                    delay={180}
                  />
                </div>

                <div className="animate-rise rounded-xl border border-line bg-surface p-6 dark:border-line-dark dark:bg-surface-dark">
                  <div className="mb-4 flex items-center justify-between">
                    <h2 className="font-display text-lg font-medium text-ink-900 dark:text-ink-900-dark">
                      Population over time
                    </h2>
                    <span className="rounded-full bg-teal-50 px-2.5 py-1 font-mono text-xs text-teal-600 dark:bg-teal-500/10 dark:text-teal-400">
                      {range.start} - {range.end}
                    </span>
                  </div>
                  <PopulationChart data={filteredData} />
                </div>
              </div>
            )}

            {filteredData.length > 0 && stats && <DataTable data={filteredData} />}
          </div>
        )}
      </main>

      {/*<footer className="mx-auto max-w-6xl px-4 py-8 text-center text-xs text-ink-300 dark:text-ink-500-dark sm:px-6">

      </footer>*/}
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <DashboardContent />
    </ThemeProvider>
  );
}

export default App;
