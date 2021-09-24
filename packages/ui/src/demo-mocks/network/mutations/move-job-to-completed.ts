import type {
  MoveJobToCompletedMutation,
  MoveJobToCompletedMutationVariables,
} from '@/typings/gql';
import { JobStatus } from '@/typings/gql';
import { networkMockData } from '../data';

export const moveJobToCompletedMock = (
  args: MoveJobToCompletedMutationVariables
): Promise<MoveJobToCompletedMutation> => {
  const job = networkMockData.findJob(args.queue, args.id);
  if (job) {
    job.status = JobStatus.Completed;
  }
  return Promise.resolve({ moveJobToCompleted: job });
};
