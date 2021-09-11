import type { GetJobLogsQuery, GetJobLogsQueryVariables } from '@/typings/gql';
import { gqlClient } from '@/network/gql-client';
import { gql } from 'graphql-request';

export const getJobLogs = (
  args: GetJobLogsQueryVariables
): Promise<GetJobLogsQuery> =>
  gqlClient.request(
    gql`
      query GetJobLogs($queue: ID!, $id: ID!) {
        job(queue: $queue, id: $id) {
          logs {
            logs
            count
          }
        }
      }
    `,
    args
  );
