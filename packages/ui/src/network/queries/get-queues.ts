import { gqlClient } from '@/network/gql-client';
import type { GetQueuesQuery } from '@/typings/gql';
import { gql } from 'graphql-request';

export const getQueues = (): Promise<GetQueuesQuery> =>
  gqlClient.request(
    gql`
      query GetQueues {
        queues {
          name
          isPaused
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
  );
