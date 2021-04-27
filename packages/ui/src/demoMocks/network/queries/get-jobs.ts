import type { GetJobsQuery, GetJobsQueryVariables } from '@/typings/gql';
import { networkMockData } from '../data';
import isEmpty from 'lodash/isEmpty';

export const getJobsMock = ({
  queue,
  statuses,
  offset = 0,
  limit = 20,
  id,
}: GetJobsQueryVariables): Promise<GetJobsQuery> => {
  if (id) {
    const job = networkMockData.jobs.find(
      (job) => job.queue === queue && job.id === id,
    );
    return Promise.resolve({
      jobs: job ? [job] : [],
    });
  }
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
