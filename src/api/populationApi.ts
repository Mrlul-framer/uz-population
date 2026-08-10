import { apiClient } from './client';
import type { PopulationResponse } from '../types/population';

export async function fetchPopulation(): Promise<PopulationResponse> {
  const { data } = await apiClient.get<PopulationResponse>('/population');
  return data;
}
