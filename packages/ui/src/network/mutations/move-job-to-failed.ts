import type {
  MoveJobToFailedMutation,
  MoveJobToFailedMutationVariables,
} from '@/typings/gql';
import { gql, GraphQLClient } from 'graphql-request';

export const moveJobToFailed = (gqlClient: GraphQLClient) => (
  args: MoveJobToFailedMutationVariables
): Promise<MoveJobToFailedMutation> =>
  gqlClient.request(
    gql`
      mutation MoveJobToFailed($queue: ID!, $id: ID!) {
        moveJobToFailed(queue: $queue, id: $id) {
          id
        }
      }
    `,
    args
  );
