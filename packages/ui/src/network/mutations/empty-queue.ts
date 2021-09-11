import { gqlClient } from '@/network/gql-client';
import type {
  EmptyQueueMutation,
  EmptyQueueMutationVariables,
} from '@/typings/gql';
import { gql } from 'graphql-request';

export const emptyQueue = (
  args: EmptyQueueMutationVariables
): Promise<EmptyQueueMutation> =>
  gqlClient.request(
    gql`
      mutation EmptyQueue($queue: ID!) {
        emptyQueue(queue: $queue) {
          name
        }
      }
    `,
    args
  );
