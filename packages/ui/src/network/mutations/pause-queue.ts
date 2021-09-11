import { gqlClient } from '@/network/gql-client';
import type {
  PauseQueueMutation,
  PauseQueueMutationVariables,
} from '@/typings/gql';
import { gql } from 'graphql-request';

export const pauseQueue = (
  args: PauseQueueMutationVariables
): Promise<PauseQueueMutation> =>
  gqlClient.request(
    gql`
      mutation PauseQueue($queue: ID!) {
        pauseQueue(queue: $queue) {
          name
        }
      }
    `,
    args
  );
