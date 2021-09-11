import type { GetJobDataQuery, GetJobDataQueryVariables } from '@/typings/gql';
import { gqlClient } from '@/network/gql-client';
import { gql } from 'graphql-request';

export const getJobData = (
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
