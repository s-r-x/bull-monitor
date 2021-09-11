import type {
  CreateJobLogMutation,
  CreateJobLogMutationVariables,
} from '@/typings/gql';
import { networkMockData } from '../data';

export const createJobLogMock = (
  args: CreateJobLogMutationVariables
): Promise<CreateJobLogMutation> => {
  const job = networkMockData.findJob(args.queue, args.id);
  if (job) {
    job.logs.logs.push(args.row);
    job.logs.count += 1;
  }
  return Promise.resolve({ log: job });
};
