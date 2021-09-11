import type {
  DiscardJobMutation,
  DiscardJobMutationVariables,
} from '@/typings/gql';
import { networkMockData } from '../data';

export const discardJobMock = (
  args: DiscardJobMutationVariables
): Promise<DiscardJobMutation> => {
  return Promise.resolve({
    discardJob: networkMockData.findJob(args.queue, args.id),
  });
};
