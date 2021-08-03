import { gql } from 'apollo-server-core';

export const rootQueryTypeDef = gql`
  input JobDataSearchInput {
    """
    any key supported by https://lodash.com/docs/4.17.15#get
    if not specified text search will be performed on the whole stringified data
    """
    key: String
    term: String!
  }
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
      dataSearch: JobDataSearchInput
    ): [Job!]!
    job(queue: ID!, id: ID!): Job
    redisInfo: RedisInfo
  }
`;
