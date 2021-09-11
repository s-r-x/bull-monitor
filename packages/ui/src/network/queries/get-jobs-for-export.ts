import type {
  GetJobsForExportQuery,
  GetJobsForExportQueryVariables,
} from '@/typings/gql';
import { gqlClient } from '@/network/gql-client';
import { gql } from 'graphql-request';

export const getJobsForExport = (
  args: GetJobsForExportQueryVariables
): Promise<GetJobsForExportQuery> =>
  gqlClient.request(
    gql`
      query GetJobsForExport($queue: ID!, $ids: [ID]!) {
        jobs(queue: $queue, ids: $ids) {
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
          name
          opts
          data
          logs {
            count
            logs
          }
        }
      }
    `,
    args
  );
