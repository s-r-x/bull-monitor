import type {
  EmptyQueueMutation,
  EmptyQueueMutationVariables,
} from '@/typings/gql';
import { JobStatus } from '@/typings/gql';
import { networkMockData } from '../data';

export const emptyQueueMock = (
  args: EmptyQueueMutationVariables
): Promise<EmptyQueueMutation> => {
  const queue = networkMockData.findQueue(args.queue);
  networkMockData.jobs = networkMockData.jobs.filter(
    (job) =>
      job.queue !== args.queue &&
      job.status !== JobStatus.Waiting &&
      job.status !== JobStatus.Delayed
  );
  return Promise.resolve({ emptyQueue: queue });
};
