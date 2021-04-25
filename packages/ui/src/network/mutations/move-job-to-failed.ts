import { gqlClient } from '@/network/gql-client';
import type {
  MoveJobToFailedMutation,
  MoveJobToFailedMutationVariables,
} from '@/typings/gql';
import { gql } from 'graphql-request';

export const moveJobToFailed = (
  args: MoveJobToFailedMutationVariables,
): Promise<MoveJobToFailedMutation> =>
  gqlClient.request(
    gql`
      mutation MoveJobToFailed($queue: String!, $id: ID!) {
        moveJobToFailed(queue: $queue, id: $id) {
          id
        }
      }
    `,
    args,
  );
