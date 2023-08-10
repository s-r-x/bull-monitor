import gql from 'graphql-tag';

export const metricsTypeDef = gql`
  type QueueMetrics {
    timestamp: Float!
    counts: QueueJobsCounts!
    processingTime: Float
    processingTimeMin: Float
    processingTimeMax: Float
  }
`;
