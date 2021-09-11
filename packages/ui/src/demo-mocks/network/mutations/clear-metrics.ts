import type { ClearMetricsMutation } from '@/typings/gql';

export const clearMetricsMock = (): Promise<ClearMetricsMutation> => {
  return Promise.resolve({ clearMetrics: true });
};
