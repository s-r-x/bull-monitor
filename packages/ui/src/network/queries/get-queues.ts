import { gql, GraphQLClient } from 'graphql-request';
import type { GetQueuesQuery } from '@/typings/gql';

export const getQueues = (gqlClient: GraphQLClient) => (): Promise<GetQueuesQuery> =>
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
          }
        }
      }
    `
  );
