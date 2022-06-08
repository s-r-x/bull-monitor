import type {
  EmptyQueueMutation,
  EmptyQueueMutationVariables,
} from '@/typings/gql';
import { gql, GraphQLClient } from 'graphql-request';

export const emptyQueue = (gqlClient: GraphQLClient) =>  (
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
