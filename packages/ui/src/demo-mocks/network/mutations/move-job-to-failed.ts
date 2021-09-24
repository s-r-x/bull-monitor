import type {
  MoveJobToFailedMutation,
  MoveJobToFailedMutationVariables,
} from '@/typings/gql';
import { JobStatus } from '@/typings/gql';
import { networkMockData } from '../data';

export const moveJobToFailedMock = (
  args: MoveJobToFailedMutationVariables
): Promise<MoveJobToFailedMutation> => {
  const job = networkMockData.findJob(args.queue, args.id);
  if (job) {
    job.status = JobStatus.Failed;
  }
  return Promise.resolve({ moveJobToFailed: job });
};
