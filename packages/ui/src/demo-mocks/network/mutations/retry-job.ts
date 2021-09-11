import type {
  RetryJobMutation,
  RetryJobMutationVariables,
} from '@/typings/gql';
import { networkMockData } from '../data';

export const retryJobMock = (
  args: RetryJobMutationVariables
): Promise<RetryJobMutation> => {
  return Promise.resolve({
    retryJob: networkMockData.findJob(args.queue, args.id),
  });
};
