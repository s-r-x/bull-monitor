import { gqlClient } from '@/network/gql-client';
import { gql } from 'graphql-request';
import type {
  GetQueueCountsQuery,
  GetQueueCountsQueryVariables,
} from '@/typings/gql';

export const getQueueCounts = (
  args: GetQueueCountsQueryVariables,
): Promise<GetQueueCountsQuery> =>
  gqlClient.request(
    gql`
      query GetQueueCounts($name: String!) {
        queue(name: $name) {
          jobsCounts {
            waiting
            active
            completed
            failed
            delayed
            paused
          }
        }
      }
    `,
    args,
  );
