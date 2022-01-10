import { QueueProvider } from '@/typings/gql';
import { networkMockData } from '../data';
import type { GetQueuesQuery } from '@/typings/gql';

export const getQueuesMock = (): Promise<GetQueuesQuery> => {
  return Promise.resolve({
    queues: networkMockData.queues.map((queue) => ({
      id: queue.id,
      provider: QueueProvider.Bull,
      name: queue.name,
      isPaused: queue.isPaused,
      keyPrefix: queue.keyPrefix,
      jobsCounts: networkMockData.jobs.reduce(
        (acc, job) => {
          if (job.queue === queue.id) {
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
        }
      ),
    })),
  });
};
