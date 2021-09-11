import type { GetJobByIdQuery, GetJobByIdQueryVariables } from '@/typings/gql';
import { gqlClient } from '@/network/gql-client';
import { gql } from 'graphql-request';
import { COMMON_JOB_FIELDS_FRAG } from '../fragments/common-page-fields';

export const getJobById = (
  args: GetJobByIdQueryVariables
): Promise<GetJobByIdQuery> =>
  gqlClient.request(
    gql`
      ${COMMON_JOB_FIELDS_FRAG}
      query GetJobById($queue: ID!, $id: ID!) {
        job(queue: $queue, id: $id) {
          ...CommonJobFields
        }
      }
    `,
    args
  );
