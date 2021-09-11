import type { GetJobsQuery, GetJobsQueryVariables } from '@/typings/gql';
import { networkMockData } from '../data';

export const getJobsMock = ({
  queue,
  status,
  offset = 0,
  limit = 20,
  id,
}: GetJobsQueryVariables): Promise<GetJobsQuery> => {
  if (id) {
    const job = networkMockData.jobs.find(
      (job) => job.queue === queue && job.id === id
    );
    return Promise.resolve({
      jobs: job ? [job] : [],
    });
  }
  const jobs = networkMockData.jobs
    .filter((job) => job.queue === queue && status === job.status)
    // @ts-ignore
    .slice(offset, offset + limit - 1);
  return Promise.resolve({
    jobs,
  });
};
