import type {
  RemoveJobsByPatternMutation,
  RemoveJobsByPatternMutationVariables,
} from '@/typings/gql';
import { networkMockData } from '../data';

export const removeJobsByPatternMock = (
  args: RemoveJobsByPatternMutationVariables
): Promise<RemoveJobsByPatternMutation> => {
  const regex = new RegExp(args.pattern);
  networkMockData.jobs = networkMockData.jobs.filter((job) => {
    return job.queue !== args.queue && !regex.test(String(job.id));
  });
  return Promise.resolve({
    removeJobsByPattern: true,
  });
};
