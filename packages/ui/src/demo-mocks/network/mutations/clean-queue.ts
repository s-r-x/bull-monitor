import type {
  CleanQueueMutation,
  CleanQueueMutationVariables,
} from '@/typings/gql';
import { JobStatus, JobStatusClean } from '@/typings/gql';
import { networkMockData } from '../data';

export const cleanQueueMock = (
  args: CleanQueueMutationVariables
): Promise<CleanQueueMutation> => {
  networkMockData.jobs = networkMockData.jobs.filter((job) => {
    if (job.queue !== args.queue) {
      return true;
    }
    return (
      job.status !==
      (args.status === JobStatusClean.Wait ? JobStatus.Waiting : args.status)
    );
  });
  return Promise.resolve({ cleanQueue: [] });
};
