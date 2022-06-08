import type { GetJobLogsQuery, GetJobLogsQueryVariables } from '@/typings/gql';
import { gql, GraphQLClient } from 'graphql-request';

export const getJobLogs = (gqlClient: GraphQLClient) => (
  args: GetJobLogsQueryVariables
): Promise<GetJobLogsQuery> => {
  return gqlClient.request(
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
};
