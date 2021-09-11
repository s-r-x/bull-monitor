import type { GetJobsQuery, GetJobsQueryVariables } from '@/typings/gql';
import { gqlClient } from '@/network/gql-client';
import { gql } from 'graphql-request';
import { COMMON_JOB_FIELDS_FRAG } from '../fragments/common-page-fields';

export const getJobs = (args: GetJobsQueryVariables): Promise<GetJobsQuery> =>
  gqlClient.request(
    gql`
      ${COMMON_JOB_FIELDS_FRAG}
      query GetJobs(
        $queue: ID!
        $offset: Int
        $limit: Int
        $status: JobStatus
        $order: OrderEnum
        $id: ID
        $dataSearch: String
        $fetchData: Boolean!
      ) {
        jobs(
          queue: $queue
          offset: $offset
          limit: $limit
          status: $status
          order: $order
          id: $id
          dataSearch: $dataSearch
        ) {
          ...CommonJobFields
          data @include(if: $fetchData)
        }
      }
    `,
    args
  );
