import type {
  DiscardJobMutation,
  DiscardJobMutationVariables,
} from '@/typings/gql';
import { gql, GraphQLClient } from 'graphql-request';

export const discardJob = (gqlClient: GraphQLClient) => (
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
