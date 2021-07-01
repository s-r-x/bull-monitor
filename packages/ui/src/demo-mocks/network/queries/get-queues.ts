import type { GetQueuesQuery } from '@/typings/gql';
import { networkMockData } from '../data';

export const getQueuesMock = (): Promise<GetQueuesQuery> => {
  return Promise.resolve({
    queues: networkMockData.queues.map((queue) => ({
      name: queue.name,
      isPaused: queue.isPaused,
      jobsCounts: networkMockData.jobs.reduce(
        (acc, job) => {
          if (job.queue === queue.name) {
            // @ts-ignore
            acc[job.status] += 1;
          }
          return acc;
        },
        {
          waiting: 0,
          active: 0,
          completed: 0,
          failed: 0,
          delayed: 0,
          paused: 0,
        },
      ),
    })),
  });
};
