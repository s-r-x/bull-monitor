import type {
  ClearAllMetricsMutation,
} from '@/typings/gql';

export const clearAllMetricsMock = (
  _args: any
): Promise<ClearAllMetricsMutation> => {
  return Promise.resolve({ clearAllMetrics: true });
};
