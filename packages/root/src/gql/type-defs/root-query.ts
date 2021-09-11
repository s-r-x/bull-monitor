import { gql } from 'apollo-server-core';

export const rootQueryTypeDef = gql`
  type Query {
    queues: [Queue!]
    queue(id: ID!): Queue
    metrics(queue: ID!, start: Int = 0, end: Int = -1): [QueueMetrics!]
    jobs(
      queue: ID!
      offset: Int
      limit: Int
      status: JobStatus
      order: OrderEnum
      id: ID
      ids: [ID]
      dataSearch: String
    ): [Job!]!
    job(queue: ID!, id: ID!): Job
    redisInfo: RedisInfo
  }
`;
