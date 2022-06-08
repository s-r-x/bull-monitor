import type {
  MoveJobToCompletedMutation,
  MoveJobToCompletedMutationVariables,
} from '@/typings/gql';
import { gql, GraphQLClient } from 'graphql-request';

export const moveJobToCompleted = (gqlClient: GraphQLClient) => (
  args: MoveJobToCompletedMutationVariables
): Promise<MoveJobToCompletedMutation> =>
  gqlClient.request(
    gql`
      mutation MoveJobToCompleted($queue: ID!, $id: ID!) {
        moveJobToCompleted(queue: $queue, id: $id) {
          id
        }
      }
    `,
    args
  );
