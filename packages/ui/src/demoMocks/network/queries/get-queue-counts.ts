import type {
  GetQueueCountsQuery,
  GetQueueCountsQueryVariables,
} from '@/typings/gql';
import { networkMockData } from '../data';

export const getQueueCountsMock = (
  args: GetQueueCountsQueryVariables,
): Promise<GetQueueCountsQuery> =>
  Promise.resolve({
    queue: {
      jobsCounts: networkMockData.jobs.reduce(
        (acc, job) => {
          if (job.queue === args.name) {
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
    },
  });
