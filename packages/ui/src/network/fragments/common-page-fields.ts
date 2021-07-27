import { gql } from 'graphql-request';

export const COMMON_JOB_FIELDS_FRAG = gql`
  fragment CommonJobFields on Job {
    id
    progress
    attemptsMade
    failedReason
    status
    stacktrace
    timestamp
    returnValue
    finishedOn
    processedOn
    processingTime
    name
    opts
    delay
  }
`;
