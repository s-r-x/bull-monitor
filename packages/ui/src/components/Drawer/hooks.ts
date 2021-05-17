import { useEffect, useMemo } from 'react';
import { useQueuesFilterStore } from '@/stores/queues-filter';
import type { GetQueuesQuery } from '@/typings/gql';
import { useActiveQueueStore } from '@/stores/active-queue';
import shallow from 'zustand/shallow';

type TQueues = GetQueuesQuery['queues'];
export const useFilteredQueues = (queues?: TQueues) => {
  const filterName = useQueuesFilterStore((state) => state.name);
  return useMemo(() => {
    if (!queues || !filterName) {
      return queues;
    }
    const lowerFilter = filterName.toLowerCase();
    return queues.filter(({ name }) =>
      name.toLowerCase().includes(lowerFilter),
    );
  }, [filterName, queues]);
};
export const useSetActiveQueueOnFirstLoad = (queues?: TQueues) => {
  const [activeQueue, changeActiveQueue] = useActiveQueueStore(
    (state) => [state.active, state.changeActive],
    shallow,
  );
  useEffect(() => {
    if (!activeQueue && queues) {
      const firstQueue = queues[0];
      if (firstQueue) {
        changeActiveQueue(firstQueue.name);
      }
    }
  }, [queues, activeQueue]);
};
