import type {
  RemoveJobMutation,
  RemoveJobMutationVariables,
} from '@/typings/gql';
import { gql, GraphQLClient } from 'graphql-request';

export const removeJob = (gqlClient: GraphQLClient) => (
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
