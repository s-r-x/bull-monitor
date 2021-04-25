import {
  CleanQueueMutation,
  CleanQueueMutationVariables,
  JobStatus,
  JobStatusClean,
} from '@/typings/gql';
import { networkMockData } from '../data';

export const cleanQueueMock = (
  args: CleanQueueMutationVariables,
): Promise<CleanQueueMutation> => {
  networkMockData.jobs = networkMockData.jobs.filter(
    (job) =>
      job.queue !== args.queue &&
      job.status !==
        (args.status === JobStatusClean.Wait ? JobStatus.Waiting : args.status),
  );
  return Promise.resolve({ cleanQueue: [] });
};
