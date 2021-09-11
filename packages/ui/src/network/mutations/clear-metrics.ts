import { gqlClient } from '@/network/gql-client';
import type {
  ClearMetricsMutation,
  ClearMetricsMutationVariables,
} from '@/typings/gql';
import { gql } from 'graphql-request';

export const clearMetrics = (
  args: ClearMetricsMutationVariables
): Promise<ClearMetricsMutation> =>
  gqlClient.request(
    gql`
      mutation ClearMetrics($queue: ID!) {
        clearMetrics(queue: $queue)
      }
    `,
    args
  );
