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
    queue(name: String!): Queue
    jobs(
      queue: String!
      offset: Int
      limit: Int
      status: JobStatus
      order: OrderEnum
      id: ID
      ids: [ID]
      dataSearch: JobDataSearchInput
    ): [Job!]!
    job(queue: String!, id: ID!): Job
    redisInfo: RedisInfo
  }
`;
