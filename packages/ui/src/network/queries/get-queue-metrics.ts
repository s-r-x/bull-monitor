import type {
  GetQueueMetricsQuery,
  GetQueueMetricsQueryVariables,
} from '@/typings/gql';
import { gqlClient } from '@/network/gql-client';
import { gql } from 'graphql-request';

export const getQueueMetrics = (
  args: GetQueueMetricsQueryVariables
): Promise<GetQueueMetricsQuery> =>
  gqlClient.request(
    gql`
      query GetQueueMetrics($queue: ID!, $start: Int, $end: Int) {
        metrics(queue: $queue, start: $start, end: $end) {
          timestamp
          processingTime
          processingTimeMin
          processingTimeMax
          counts {
            waiting
            active
            completed
            failed
            delayed
            paused
          }
        }
      }
    `,
    args
  );
