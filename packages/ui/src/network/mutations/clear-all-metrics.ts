import type { ClearAllMetricsMutation } from '@/typings/gql';
import { gql, GraphQLClient } from 'graphql-request';

export const clearAllMetrics = (gqlClient: GraphQLClient) => (): Promise<ClearAllMetricsMutation> =>
  gqlClient.request(
    gql`
      mutation ClearAllMetrics {
        clearAllMetrics
      }
    `
  );
