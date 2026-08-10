import axios, { type AxiosAdapter, type AxiosResponse } from 'axios';
import populationDataset from '../data/population.json';

// console.log(populationDataset.data)

const NETWORK_DELAY_MS = 650;

function shouldSimulateError(): boolean {
  if (typeof window === 'undefined') return false;
  return new URLSearchParams(window.location.search).get('simulateError') === '1';
}

function shouldSimulateEmpty(): boolean {
  if (typeof window === 'undefined') return false;
  return new URLSearchParams(window.location.search).get('simulateEmpty') === '1';
}

const mockAdapter: AxiosAdapter = async (config) => {
  await new Promise((resolve) => setTimeout(resolve, NETWORK_DELAY_MS));

  if (shouldSimulateError()) {
    return Promise.reject({
      isAxiosError: true,
      message: 'Network Error',
      config,
      response: {
        status: 503,
        statusText: 'Service Unavailable',
        data: { message: 'Population service is temporarily unavailable' },
        headers: {},
        config,
      },
    });
  }

  const url = config.url ?? '';

  if (url.includes('/population')) {
    const payload = shouldSimulateEmpty()
      ? { ...populationDataset, data: [] }
      : populationDataset;

    const response: AxiosResponse = {
      data: payload,
      status: 200,
      statusText: 'OK',
      headers: {},
      config,
    };
    return response;
  }

  return Promise.reject({
    isAxiosError: true,
    message: `Not Found: ${url}`,
    config,
    response: {
      status: 404,
      statusText: 'Not Found',
      data: { message: 'Unknown endpoint' },
      headers: {},
      config,
    },
  });
};

export const apiClient = axios.create({
  baseURL: '/api',
  adapter: mockAdapter,
  timeout: 10000,
});

apiClient.interceptors.request.use((config) => {
  if (import.meta.env.DEV) {
    console.debug(`[mock-api] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error?.response?.data?.message ?? error?.message ?? 'Unexpected error occurred';
    return Promise.reject(new Error(message));
  }
);
