import gql from 'graphql-tag';


export const queueTypeDef = gql`
  type QueueJobsCounts {
    waiting: Int!
    active: Int!
    completed: Int!
    failed: Int!
    delayed: Int!
    paused: Int!
  }
  type Queue {
    name: String!
    waitingOrDelayedJobsCount: Int!
    jobsCounts: QueueJobsCounts!
    jobs: [Job]!
    isPaused: Boolean!
  }
`;
