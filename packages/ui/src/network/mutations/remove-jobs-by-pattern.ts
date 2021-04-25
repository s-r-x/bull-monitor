import { gqlClient } from '@/network/gql-client';
import type {
  RemoveJobsByPatternMutation,
  RemoveJobsByPatternMutationVariables,
} from '@/typings/gql';
import { gql } from 'graphql-request';

export const removeJobsByPattern = (
  args: RemoveJobsByPatternMutationVariables,
): Promise<RemoveJobsByPatternMutation> =>
  gqlClient.request(
    gql`
      mutation RemoveJobsByPattern($queue: String!, $pattern: String!) {
        removeJobsByPattern(queue: $queue, pattern: $pattern)
      }
    `,
    args,
  );
