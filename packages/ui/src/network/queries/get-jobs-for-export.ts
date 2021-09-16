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
      query GetJobsForExport(
        $queue: ID!
        $ids: [ID]
        $status: JobStatus
        $id: ID
        $dataSearch: String
      ) {
        jobs(
          queue: $queue
          ids: $ids
          status: $status
          id: $id
          dataSearch: $dataSearch
          offset: 0
          limit: 100000
        ) {
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
