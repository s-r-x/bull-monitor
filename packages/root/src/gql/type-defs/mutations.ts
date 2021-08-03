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
    pauseQueue(queue: ID!): Queue
    """
    https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#queueresume
    """
    resumeQueue(queue: ID!): Queue
    """
    https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#queueclose
    """
    closeQueue(queue: ID!): Queue
    """
    https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#queueclean
    """
    cleanQueue(
      queue: ID!
      grace: Int = 1000
      status: JobStatusClean!
      limit: Int
    ): [ID]!
    """
    https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#queueempty
    """
    emptyQueue(queue: ID!): Queue
    """
    https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#jobremove
    """
    removeJob(queue: ID!, id: ID!): Job
    """
    calls https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#jobremove on every passed job
    """
    removeJobs(queue: ID!, jobs: [ID!]!): [Job]!
    """
    https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#jobmovetocompleted
    """
    moveJobToCompleted(queue: ID!, id: ID!): Job
    """
    https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#jobmovetofailed
    """
    moveJobToFailed(queue: ID!, id: ID!): Job
    """
    https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#jobdiscard
    """
    discardJob(queue: ID!, id: ID!): Job
    """
    https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#jobpromote
    """
    promoteJob(queue: ID!, id: ID!): Job
    """
    https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#jobupdate
    """
    updateJobData(queue: ID!, id: ID!, data: JSON): Job
    """
    https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#jobretry
    """
    retryJob(queue: ID!, id: ID!): Job
    """
    calls https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#jobretry on every passed job
    """
    retryJobs(queue: ID!, jobs: [ID!]!): [Job]!
    """
    https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#joblog
    """
    log(queue: ID!, id: ID!, row: String!): Job
    """
    https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#queueadd
    """
    createJob(input: CreateJobInput!): Job
    """
    https://github.com/OptimalBits/bull/blob/develop/REFERENCE.md#queueremovejobs
    """
    removeJobsByPattern(queue: ID!, pattern: String!): Boolean

    clearMetrics(queue: ID!): Boolean
    clearAllMetrics: Boolean
  }
`;
