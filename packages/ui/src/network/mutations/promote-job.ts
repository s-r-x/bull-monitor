import type {
  PromoteJobMutation,
  PromoteJobMutationVariables,
} from '@/typings/gql';
import { gql, GraphQLClient } from 'graphql-request';

export const promoteJob = (gqlClient: GraphQLClient) => (
  args: PromoteJobMutationVariables
): Promise<PromoteJobMutation> =>
  gqlClient.request(
    gql`
      mutation PromoteJob($queue: ID!, $id: ID!) {
        promoteJob(queue: $queue, id: $id) {
          id
        }
      }
    `,
    args
  );
