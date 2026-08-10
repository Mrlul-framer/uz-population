export interface PopulationPoint {
  year: number;
  population: number;
}

export interface PopulationResponse {
  country: string;
  unit: string;
  source: string;
  lastUpdated: string;
  data: PopulationPoint[];
}

export type PresetRange = '1991-2026' | '2000-2026' | '2010-2026' | 'custom';

export interface YearRange {
  start: number;
  end: number;
}

export interface PopulationStats {
  currentPopulation: number;
  currentYear: number;
  initialPopulation: number;
  initialYear: number;
  totalGrowth: number;
  growthPercent: number;
}
