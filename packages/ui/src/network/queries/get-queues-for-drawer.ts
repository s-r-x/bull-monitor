import { gqlClient } from '@/network/gql-client';
import type { GetQueuesForDrawerQuery } from '@/typings/gql';
import { gql } from 'graphql-request';

export const getQueuesForDrawer = (): Promise<GetQueuesForDrawerQuery> =>
  gqlClient.request(
    gql`
      query GetQueuesForDrawer {
        queues {
          name
          count
        }
      }
    `,
  );
