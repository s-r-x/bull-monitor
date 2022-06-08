import type {
  RemoveJobsByPatternMutation,
  RemoveJobsByPatternMutationVariables,
} from '@/typings/gql';
import { gql, GraphQLClient } from 'graphql-request';

export const removeJobsByPattern = (gqlClient: GraphQLClient) => (
  args: RemoveJobsByPatternMutationVariables
): Promise<RemoveJobsByPatternMutation> =>
  gqlClient.request(
    gql`
      mutation RemoveJobsByPattern($queue: ID!, $pattern: String!) {
        removeJobsByPattern(queue: $queue, pattern: $pattern)
      }
    `,
    args
  );
