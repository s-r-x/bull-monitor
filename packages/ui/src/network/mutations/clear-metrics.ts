import type {
  ClearMetricsMutation,
  ClearMetricsMutationVariables,
} from '@/typings/gql';
import { gql, GraphQLClient } from 'graphql-request';

export const clearMetrics = (gqlClient: GraphQLClient) => (
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
