import { gqlClient } from '@/network/gql-client';
import type {
  RetryJobsMutation,
  RetryJobsMutationVariables,
} from '@/typings/gql';
import { gql } from 'graphql-request';

export const retryJobs = (
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
