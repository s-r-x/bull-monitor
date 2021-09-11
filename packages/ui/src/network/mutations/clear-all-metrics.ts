import { gqlClient } from '@/network/gql-client';
import type { ClearAllMetricsMutation } from '@/typings/gql';
import { gql } from 'graphql-request';

export const clearAllMetrics = (): Promise<ClearAllMetricsMutation> =>
  gqlClient.request(
    gql`
      mutation ClearAllMetrics {
        clearAllMetrics
      }
    `
  );
