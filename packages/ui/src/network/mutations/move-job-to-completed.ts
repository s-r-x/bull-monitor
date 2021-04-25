import { gqlClient } from '@/network/gql-client';
import type {
  MoveJobToCompletedMutation,
  MoveJobToCompletedMutationVariables,
} from '@/typings/gql';
import { gql } from 'graphql-request';

export const moveJobToCompleted = (
  args: MoveJobToCompletedMutationVariables,
): Promise<MoveJobToCompletedMutation> =>
  gqlClient.request(
    gql`
      mutation MoveJobToCompleted($queue: String!, $id: ID!) {
        moveJobToCompleted(queue: $queue, id: $id) {
          id
        }
      }
    `,
    args,
  );
