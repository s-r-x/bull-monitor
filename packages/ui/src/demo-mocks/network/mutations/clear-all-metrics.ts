import type { ClearAllMetricsMutation } from '@/typings/gql';

export const clearAllMetricsMock = (): Promise<ClearAllMetricsMutation> => {
  return Promise.resolve({ clearAllMetrics: true });
};
