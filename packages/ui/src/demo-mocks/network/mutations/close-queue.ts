import type {
  CloseQueueMutation,
  CloseQueueMutationVariables,
} from '@/typings/gql';
import { networkMockData } from '../data';

export const closeQueueMock = (
  args: CloseQueueMutationVariables
): Promise<CloseQueueMutation> => {
  const queue = networkMockData.findQueue(args.queue);
  // TODO
  return Promise.resolve({ closeQueue: queue });
};
