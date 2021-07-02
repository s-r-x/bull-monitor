import type {
  ClearMetricsMutation,
  ClearMetricsMutationVariables,
} from '@/typings/gql';

export const clearMetricsMock = (
  _args: ClearMetricsMutationVariables,
): Promise<ClearMetricsMutation> => {
  return Promise.resolve({ clearMetrics: true });
};
