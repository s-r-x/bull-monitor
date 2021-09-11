import {
  JobStatus,
  PromoteJobMutation,
  PromoteJobMutationVariables,
} from '@/typings/gql';
import { networkMockData } from '../data';

export const promoteJobMock = (
  args: PromoteJobMutationVariables
): Promise<PromoteJobMutation> => {
  const job = networkMockData.findJob(args.queue, args.id);
  if (job) {
    job.status = JobStatus.Waiting;
  }
  return Promise.resolve({ promoteJob: job });
};
