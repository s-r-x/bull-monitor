import { gqlClient } from '@/network/gql-client';
import type {
  CloseQueueMutation,
  CloseQueueMutationVariables,
} from '@/typings/gql';
import { gql } from 'graphql-request';

export const closeQueue = (
  args: CloseQueueMutationVariables
): Promise<CloseQueueMutation> =>
  gqlClient.request(
    gql`
      mutation CloseQueue($queue: ID!) {
        closeQueue(queue: $queue) {
          name
        }
      }
    `,
    args
  );
