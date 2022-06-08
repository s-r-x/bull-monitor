import type {
  PauseQueueMutation,
  PauseQueueMutationVariables,
} from '@/typings/gql';
import { gql, GraphQLClient } from 'graphql-request';

export const pauseQueue = (gqlClient: GraphQLClient) => (
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
