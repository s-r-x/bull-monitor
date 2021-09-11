import type {
  ResumeQueueMutation,
  ResumeQueueMutationVariables,
} from '@/typings/gql';
import { networkMockData } from '../data';

export const resumeQueueMock = (
  args: ResumeQueueMutationVariables
): Promise<ResumeQueueMutation> => {
  const queue = networkMockData.findQueue(args.queue);
  if (queue) {
    queue.isPaused = false;
  }
  return Promise.resolve({ resumeQueue: queue });
};
