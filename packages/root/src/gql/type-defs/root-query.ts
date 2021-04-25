import gql from 'graphql-tag';

export const rootQueryTypeDef = gql`
  type Query {
    queues: [Queue]
    queue(name: String!): Queue
    jobs(
      queue: String!
      offset: Int
      limit: Int
      status: [JobStatus]
      order: OrderEnum
      id: ID
    ): [Job!]!
    job(queue: String!, id: ID!): Job
    redisInfo: RedisInfo
  }
`;
