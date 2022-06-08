import type { GetJobDataQuery, GetJobDataQueryVariables } from '@/typings/gql';
import { gql, GraphQLClient } from 'graphql-request';

export const getJobData = (gqlClient: GraphQLClient) => (
  args: GetJobDataQueryVariables
): Promise<GetJobDataQuery> =>
  gqlClient.request(
    gql`
      query GetJobData($queue: ID!, $id: ID!) {
        job(queue: $queue, id: $id) {
          data
        }
      }
    `,
    args
  );
