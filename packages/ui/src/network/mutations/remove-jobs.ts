import { gqlClient } from '@/network/gql-client';
import type {
  RemoveJobsMutation,
  RemoveJobsMutationVariables,
} from '@/typings/gql';
import { gql } from 'graphql-request';

export const removeJobs = (
  args: RemoveJobsMutationVariables
): Promise<RemoveJobsMutation> =>
  gqlClient.request(
    gql`
      mutation RemoveJobs($queue: ID!, $jobs: [ID!]!) {
        removeJobs(queue: $queue, jobs: $jobs) {
          id
        }
      }
    `,
    args
  );
