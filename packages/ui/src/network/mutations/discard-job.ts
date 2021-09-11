import { gqlClient } from '@/network/gql-client';
import type {
  DiscardJobMutation,
  DiscardJobMutationVariables,
} from '@/typings/gql';
import { gql } from 'graphql-request';

export const discardJob = (
  args: DiscardJobMutationVariables
): Promise<DiscardJobMutation> =>
  gqlClient.request(
    gql`
      mutation DiscardJob($queue: ID!, $id: ID!) {
        discardJob(queue: $queue, id: $id) {
          id
        }
      }
    `,
    args
  );
