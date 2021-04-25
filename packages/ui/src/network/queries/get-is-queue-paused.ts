import type {
  GetIsQueuePausedQuery,
  GetIsQueuePausedQueryVariables,
} from '@/typings/gql';
import { gqlClient } from '@/network/gql-client';
import { gql } from 'graphql-request';

export const getIsQueuePaused = (
  args: GetIsQueuePausedQueryVariables,
): Promise<GetIsQueuePausedQuery> =>
  gqlClient.request(
    gql`
      query GetIsQueuePaused($name: String!) {
        queue(name: $name) {
          isPaused
        }
      }
    `,
    args,
  );
