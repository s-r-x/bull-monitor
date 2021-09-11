import { gqlClient } from '@/network/gql-client';
import type {
  RetryJobMutation,
  RetryJobMutationVariables,
} from '@/typings/gql';
import { gql } from 'graphql-request';

export const retryJob = (
  args: RetryJobMutationVariables
): Promise<RetryJobMutation> =>
  gqlClient.request(
    gql`
      mutation RetryJob($queue: ID!, $id: ID!) {
        retryJob(queue: $queue, id: $id) {
          id
        }
      }
    `,
    args
  );
