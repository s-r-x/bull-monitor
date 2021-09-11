import type {
  RemoveJobMutation,
  RemoveJobMutationVariables,
} from '@/typings/gql';
import { networkMockData } from '../data';

export const removeJobMock = (
  args: RemoveJobMutationVariables
): Promise<RemoveJobMutation> => {
  let found: any;
  networkMockData.jobs = networkMockData.jobs.filter((job) => {
    const target = job.id === args.id && job.queue === args.queue;
    if (target) {
      found = target;
    }
    return !Boolean(target);
  });
  return Promise.resolve({
    removeJob: found,
  });
};
