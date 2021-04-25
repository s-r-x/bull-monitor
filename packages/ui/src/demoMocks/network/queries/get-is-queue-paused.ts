import type {
  GetIsQueuePausedQuery,
  GetIsQueuePausedQueryVariables,
} from '@/typings/gql';
import { networkMockData } from '../data';

export const getIsQueuePausedMock = (
  args: GetIsQueuePausedQueryVariables,
): Promise<GetIsQueuePausedQuery> => {
  const queue = networkMockData.findQueue(args.name);
  return Promise.resolve({ queue });
};
