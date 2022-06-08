import type {
  CloseQueueMutation,
  CloseQueueMutationVariables,
} from '@/typings/gql';
import { gql, GraphQLClient } from 'graphql-request';

export const closeQueue = (gqlClient: GraphQLClient) => (
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
