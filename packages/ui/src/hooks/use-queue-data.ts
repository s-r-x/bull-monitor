import { useQueuesQuery } from '@/hooks/use-queues-query';
import { useMemo } from 'react';
export const useQueueData = (queue: string) => {
  const { data } = useQueuesQuery();
  return useMemo(() => {
    return data?.queues?.find((q) => q.name === queue);
  }, [queue, data]);
};
