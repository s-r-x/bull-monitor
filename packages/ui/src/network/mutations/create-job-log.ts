import { gqlClient } from '@/network/gql-client';
import type {
  CreateJobLogMutation,
  CreateJobLogMutationVariables,
} from '@/typings/gql';
import { gql } from 'graphql-request';

export const createJobLog = (
  args: CreateJobLogMutationVariables
): Promise<CreateJobLogMutation> =>
  gqlClient.request(
    gql`
      mutation CreateJobLog($queue: ID!, $id: ID!, $row: String!) {
        log(queue: $queue, id: $id, row: $row) {
          id
        }
      }
    `,
    args
  );
