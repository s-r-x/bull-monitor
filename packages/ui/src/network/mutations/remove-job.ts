import { gqlClient } from '@/network/gql-client';
import type {
  RemoveJobMutation,
  RemoveJobMutationVariables,
} from '@/typings/gql';
import { gql } from 'graphql-request';

export const removeJob = (
  args: RemoveJobMutationVariables
): Promise<RemoveJobMutation> =>
  gqlClient.request(
    gql`
      mutation RemoveJob($queue: ID!, $id: ID!) {
        removeJob(queue: $queue, id: $id) {
          id
        }
      }
    `,
    args
  );
