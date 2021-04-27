import { gql } from 'apollo-server-core';


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
    count: Int!
    jobsCounts: QueueJobsCounts!
    jobs: [Job]!
    isPaused: Boolean!
  }
`;
