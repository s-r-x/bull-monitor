import { gqlClient } from '@/network/gql-client';
import type {
  CleanQueueMutation,
  CleanQueueMutationVariables,
} from '@/typings/gql';
import { gql } from 'graphql-request';

export const cleanQueue = (
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
