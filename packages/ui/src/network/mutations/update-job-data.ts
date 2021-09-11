import { gqlClient } from '@/network/gql-client';
import type {
  UpdateJobDataMutation,
  UpdateJobDataMutationVariables,
} from '@/typings/gql';
import { gql } from 'graphql-request';

export const updateJobData = (
  args: UpdateJobDataMutationVariables
): Promise<UpdateJobDataMutation> =>
  gqlClient.request(
    gql`
      mutation UpdateJobData($queue: ID!, $id: ID!, $data: JSON) {
        updateJobData(queue: $queue, id: $id, data: $data) {
          id
        }
      }
    `,
    args
  );
