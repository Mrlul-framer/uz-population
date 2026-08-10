import { useCallback, useEffect, useState } from 'react';
import type { PresetRange, YearRange } from '../types/population';

const PRESET_BOUNDS: Record<Exclude<PresetRange, 'custom'>, YearRange> = {
  '1991-2026': { start: 1991, end: 2026 },
  '2000-2026': { start: 2000, end: 2026 },
  '2010-2026': { start: 2010, end: 2026 },
};

interface FilterState {
  preset: PresetRange;
  range: YearRange;
}

function readFromUrl(): FilterState {
  const params = new URLSearchParams(window.location.search);
  const preset = (params.get('preset') as PresetRange) || '1991-2026';

  if (preset === 'custom') {
    const start = Number(params.get('start'));
    const end = Number(params.get('end'));
    if (Number.isFinite(start) && Number.isFinite(end) && start < end) {
      return { preset: 'custom', range: { start, end } };
    }
  }

  if (preset in PRESET_BOUNDS) {
    return { preset, range: PRESET_BOUNDS[preset as keyof typeof PRESET_BOUNDS] };
  }

  return { preset: '1991-2026', range: PRESET_BOUNDS['1991-2026'] };
}

export function useUrlFilterState() {
  const [state, setState] = useState<FilterState>(readFromUrl);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    params.set('preset', state.preset);
    if (state.preset === 'custom') {
      params.set('start', String(state.range.start));
      params.set('end', String(state.range.end));
    } else {
      params.delete('start');
      params.delete('end');
    }
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({}, '', newUrl);
  }, [state]);

  const setPreset = useCallback((preset: Exclude<PresetRange, 'custom'>) => {
    setState({ preset, range: PRESET_BOUNDS[preset] });
  }, []);

  const setCustomRange = useCallback((range: YearRange) => {
    setState({ preset: 'custom', range });
  }, []);

  return { preset: state.preset, range: state.range, setPreset, setCustomRange };
}
