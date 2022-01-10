import { gql } from 'apollo-server-core';

export const queueTypeDef = gql`
  enum QueueProvider {
    bull
    bullmq
  }
  type QueueJobsCounts {
    waiting: Int!
    active: Int!
    completed: Int!
    failed: Int!
    delayed: Int!
    paused: Int!
  }
  type Queue {
    id: String!
    provider: QueueProvider!
    name: String!
    readonly: Boolean
    keyPrefix: String
    """
    https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#queuecount
    """
    count: Int!
    """
    https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#queuegetjobcounts
    """
    jobsCounts: QueueJobsCounts!
    """
    https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#queuegetcompletedcount
    """
    completedCount: Int!
    """
    https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#queuegetfailedcount
    """
    failedCount: Int!
    """
    https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#queuegetdelayedcount
    """
    delayedCount: Int!
    """
    https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#queuegetactivecount
    """
    activeCount: Int!
    """
    https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#queuegetwaitingcount
    """
    waitingCount: Int!
    """
    https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#queuegetpausedcount
    """
    pausedCount: Int!
    jobs: [Job]!
    isPaused: Boolean!
    metrics: [QueueMetrics!]
  }
`;
