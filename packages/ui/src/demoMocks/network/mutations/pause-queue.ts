import type {
  PauseQueueMutation,
  PauseQueueMutationVariables,
} from '@/typings/gql';
import { networkMockData } from '../data';

export const pauseQueueMock = (
  args: PauseQueueMutationVariables,
): Promise<PauseQueueMutation> => {
  const queue = networkMockData.findQueue(args.queue);
  if (queue) {
    queue.isPaused = true;
  }
  return Promise.resolve({ pauseQueue: queue });
};
