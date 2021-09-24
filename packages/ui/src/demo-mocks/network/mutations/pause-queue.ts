import type {
  PauseQueueMutation,
  PauseQueueMutationVariables,
} from '@/typings/gql';
import { JobStatus } from '@/typings/gql';
import { networkMockData } from '../data';

export const pauseQueueMock = (
  args: PauseQueueMutationVariables
): Promise<PauseQueueMutation> => {
  const queue = networkMockData.findQueue(args.queue);
  if (queue) {
    queue.isPaused = true;
  }
  networkMockData.jobs = networkMockData.jobs.map((job) => {
    if (job.queue === args.queue) {
      if (
        [JobStatus.Active, JobStatus.Waiting, JobStatus.Delayed].includes(
          job.status
        )
      ) {
        return {
          ...job,
          status: JobStatus.Paused,
        };
      }
    }
    return job;
  });
  return Promise.resolve({ pauseQueue: queue });
};
