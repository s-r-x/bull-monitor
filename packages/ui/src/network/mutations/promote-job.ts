import { gqlClient } from '@/network/gql-client';
import type {
  PromoteJobMutation,
  PromoteJobMutationVariables,
} from '@/typings/gql';
import { gql } from 'graphql-request';

export const promoteJob = (
  args: PromoteJobMutationVariables,
): Promise<PromoteJobMutation> =>
  gqlClient.request(
    gql`
      mutation PromoteJob($queue: String!, $id: ID!) {
        promoteJob(queue: $queue, id: $id) {
          id
        }
      }
    `,
    args,
  );
