import type {
  CleanQueueMutation,
  CleanQueueMutationVariables,
} from '@/typings/gql';
import { gql, GraphQLClient } from 'graphql-request';

export const cleanQueue = (gqlClient: GraphQLClient) => (
  args: CleanQueueMutationVariables
): Promise<CleanQueueMutation> =>
  gqlClient.request(
    gql`
      mutation CleanQueue($queue: ID!, $status: JobStatusClean!) {
        cleanQueue(queue: $queue, status: $status)
      }
    `,
    args
  );
