import { gql } from 'apollo-server-core';

export const mutationsTypeDef = gql`
  scalar JSON

  input CreateJobInput {
    queue: String!
    name: String
    data: JSON
    options: JSON
  }
  enum OrderEnum {
    ASC
    DESC
  }
  type Mutation {
    """
    https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#queuepause
    """
    pauseQueue(queue: String!): Queue
    """
    https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#queueresume
    """
    resumeQueue(queue: String!): Queue
    """
    https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#queueclose
    """
    closeQueue(queue: String!): Queue
    """
    https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#queueclean
    """
    cleanQueue(
      queue: String!
      grace: Int = 1000
      status: JobStatusClean!
      limit: Int
    ): [ID]!
    """
    https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#queueempty
    """
    emptyQueue(queue: String!): Queue
    """
    https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#jobremove
    """
    removeJob(queue: String!, id: ID!): Job
    """
    https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#jobmovetocompleted
    """
    moveJobToCompleted(queue: String!, id: ID!): Job
    """
    https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#jobmovetofailed
    """
    moveJobToFailed(queue: String!, id: ID!): Job
    """
    https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#jobdiscard
    """
    discardJob(queue: String!, id: ID!): Job
    """
    https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#jobpromote
    """
    promoteJob(queue: String!, id: ID!): Job
    """
    https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#jobupdate
    """
    updateJobData(queue: String!, id: ID!, data: String): Job
    """
    https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#jobretry
    """
    retryJob(queue: String!, id: ID!): Job
    """
    https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#joblog
    """
    log(queue: String!, id: ID!, row: String!): Job
    """
    https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#queueadd
    """
    createJob(input: CreateJobInput!): Job
    """
    https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#queueremovejobs
    """
    removeJobsByPattern(queue: String!, pattern: String!): Boolean
  }
`;
