import type {
  UpdateJobDataMutation,
  UpdateJobDataMutationVariables,
} from '@/typings/gql';
import { gql, GraphQLClient } from 'graphql-request';

export const updateJobData = (gqlClient: GraphQLClient) => (
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
