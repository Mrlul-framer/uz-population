import { useEffect, useMemo, useState, useCallback } from 'react';
import { fetchPopulation } from '../api/populationApi';
import type { PopulationPoint, PopulationStats, YearRange } from '../types/population';

interface UsePopulationDataResult {
  isLoading: boolean;
  error: string | null;
  allData: PopulationPoint[];
  filteredData: PopulationPoint[];
  stats: PopulationStats | null;
  bounds: YearRange | null;
  source: string;
  lastUpdated: string;
  reload: () => void;
}

export function usePopulationData(range: YearRange | null): UsePopulationDataResult {
  const [allData, setAllData] = useState<PopulationPoint[]>([]);
  const [source, setSource] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [reloadKey, setReloadKey] = useState(0);

  const reload = useCallback(() => setReloadKey((key) => key + 1), []);

  useEffect(() => {
    let cancelled = false;
    setIsLoading(true);
    setError(null);

    fetchPopulation()
      .then((response) => {
        if (cancelled) return;
        const sorted = [...response.data].sort((a, b) => a.year - b.year);
        setAllData(sorted);
        setSource(response.source);
        setLastUpdated(response.lastUpdated);
      })
      .catch((err: Error) => {
        if (cancelled) return;
        setError(err.message || 'Failed to load population data');
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const bounds = useMemo<YearRange | null>(() => {
    if (allData.length === 0) return null;
    return { start: allData[0].year, end: allData[allData.length - 1].year };
  }, [allData]);

  const filteredData = useMemo(() => {
    if (!range) return allData;
    return allData.filter((point) => point.year >= range.start && point.year <= range.end);
  }, [allData, range]);

  const stats = useMemo<PopulationStats | null>(() => {
    if (filteredData.length === 0) return null;
    const first = filteredData[0];
    const last = filteredData[filteredData.length - 1];
    const totalGrowth = last.population - first.population;
    const growthPercent = (totalGrowth / first.population) * 100;

    return {
      currentPopulation: last.population,
      currentYear: last.year,
      initialPopulation: first.population,
      initialYear: first.year,
      totalGrowth,
      growthPercent,
    };
  }, [filteredData]);

  return { isLoading, error, allData, filteredData, stats, bounds, source, lastUpdated, reload };
}
