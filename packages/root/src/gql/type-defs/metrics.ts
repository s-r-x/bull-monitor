import { gql } from 'apollo-server-core';

export const metricsTypeDef = gql`
  type QueueMetrics {
    timestamp: Float!
    counts: QueueJobsCounts!
  }
`;
