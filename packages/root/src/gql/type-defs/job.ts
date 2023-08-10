import gql from 'graphql-tag';

export const jobTypeDef = gql`
  enum JobStatus {
    completed
    waiting
    active
    delayed
    failed
    paused
    stuck
    unknown
    prioritized
  }
  enum JobStatusClean {
    completed
    wait
    active
    delayed
    failed
    paused
  }
  type JobLogs {
    count: Int!
    logs: [String]!
  }
  type Job {
    id: ID!
    name: String!
    data: String
    status: JobStatus!
    returnValue: String
    progress: String!
    attemptsMade: Int!
    failedReason: String
    stacktrace: [String]!
    logs: JobLogs
    delay: Float
    timestamp: Float
    finishedOn: Float
    processedOn: Float
    processingTime: Float
    opts: String!
  }
`;
