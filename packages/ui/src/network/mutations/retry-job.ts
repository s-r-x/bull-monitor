import type {
  RetryJobMutation,
  RetryJobMutationVariables,
} from '@/typings/gql';
import { gql, GraphQLClient } from 'graphql-request';

export const retryJob = (gqlClient: GraphQLClient) => (
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
