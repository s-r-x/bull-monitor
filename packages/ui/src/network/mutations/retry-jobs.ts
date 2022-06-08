import type {
  RetryJobsMutation,
  RetryJobsMutationVariables,
} from '@/typings/gql';
import { gql, GraphQLClient } from 'graphql-request';

export const retryJobs = (gqlClient: GraphQLClient) => (
  args: RetryJobsMutationVariables
): Promise<RetryJobsMutation> =>
  gqlClient.request(
    gql`
      mutation RetryJobs($queue: ID!, $jobs: [ID!]!) {
        retryJobs(queue: $queue, jobs: $jobs) {
          id
        }
      }
    `,
    args
  );
