import type {
  RemoveJobsMutation,
  RemoveJobsMutationVariables,
} from '@/typings/gql';
import { networkMockData } from '../data';

export const removeJobsMock = (
  args: RemoveJobsMutationVariables
): Promise<RemoveJobsMutation> => {
  const found: any[] = [];
  networkMockData.jobs = networkMockData.jobs.filter((job) => {
    const target = args.jobs.includes(job.id) && job.queue === args.queue;
    if (target) {
      found.push(target);
    }
    return !Boolean(target);
  });
  return Promise.resolve({
    removeJobs: found,
  });
};
