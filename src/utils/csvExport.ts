import Papa from 'papaparse';
import type { PopulationPoint } from '../types/population';

export function downloadPopulationCsv(data: PopulationPoint[], filename: string): void {
  const csv = Papa.unparse(
    data.map((point) => ({ Year: point.year, Population: point.population }))
  );

  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
