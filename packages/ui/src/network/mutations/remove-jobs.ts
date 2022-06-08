import type {
  RemoveJobsMutation,
  RemoveJobsMutationVariables,
} from '@/typings/gql';
import { gql, GraphQLClient } from 'graphql-request';

export const removeJobs = (gqlClient: GraphQLClient) => (
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
