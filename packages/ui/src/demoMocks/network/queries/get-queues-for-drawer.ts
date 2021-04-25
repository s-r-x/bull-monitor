import { GetQueuesForDrawerQuery, JobStatus } from '@/typings/gql';
import { networkMockData } from '../data';

export const getQueuesForDrawerMock = (): Promise<GetQueuesForDrawerQuery> =>
  Promise.resolve({
    queues: networkMockData.queues.map(({ name }) => ({
      name,
      waitingOrDelayedJobsCount: networkMockData.jobs.filter(
        (job) =>
          job.queue === name &&
          (job.status === JobStatus.Waiting ||
            job.status === JobStatus.Delayed),
      ).length,
    })),
  });
