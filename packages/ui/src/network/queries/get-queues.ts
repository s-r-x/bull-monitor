import { gqlClient } from '@/network/gql-client';
import { gql } from 'graphql-request';
import type { GetQueuesQuery } from '@/typings/gql';

export const getQueues = (): Promise<GetQueuesQuery> =>
  gqlClient.request(
    gql`
      query GetQueues {
        queues {
          id
          provider
          readonly
          name
          keyPrefix
          isPaused
          jobsCounts {
            waiting
            active
            completed
            failed
            delayed
            paused
            prioritized
          }
        }
      }
    `
  );
