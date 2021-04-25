import type { GetJobsQuery, GetJobsQueryVariables } from '@/typings/gql';
import { networkMockData } from '../data';
import isEmpty from 'lodash/isEmpty';

export const getJobsMock = ({
  queue,
  statuses,
  offset = 0,
  limit = 20,
}: GetJobsQueryVariables): Promise<GetJobsQuery> => {
  const jobs = networkMockData.jobs
    .filter(
      (job) =>
        job.queue === queue &&
        (isEmpty(statuses) ? true : statuses?.includes(job.status)),
    )
    // @ts-ignore
    .slice(offset, offset + limit - 1);
  return Promise.resolve({
    jobs,
  });
};
