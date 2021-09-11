import { gqlClient } from '@/network/gql-client';
import type {
  CreateJobMutation,
  CreateJobMutationVariables,
} from '@/typings/gql';
import { gql } from 'graphql-request';

export const createJob = (
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
