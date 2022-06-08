import type {
  CreateJobMutation,
  CreateJobMutationVariables,
} from '@/typings/gql';
import { gql, GraphQLClient } from 'graphql-request';

export const createJob = (gqlClient: GraphQLClient) => (
  args: CreateJobMutationVariables
): Promise<CreateJobMutation> =>
  gqlClient.request(
    gql`
      mutation CreateJob($input: CreateJobInput!) {
        createJob(input: $input) {
          id
        }
      }
    `,
    args
  );
