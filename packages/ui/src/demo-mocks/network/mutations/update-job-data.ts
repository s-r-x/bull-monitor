import type {
  UpdateJobDataMutation,
  UpdateJobDataMutationVariables,
} from '@/typings/gql';
import { networkMockData } from '../data';

export const updateJobDataMock = (
  args: UpdateJobDataMutationVariables
): Promise<UpdateJobDataMutation> => {
  const job = networkMockData.findJob(args.queue, args.id);
  if (job) {
    job.data = args.data as string;
  }
  return Promise.resolve({
    updateJobData: job,
  });
};
