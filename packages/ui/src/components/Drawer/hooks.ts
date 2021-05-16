import { useMemo } from 'react';
import { useQueuesFilterStore } from '@/stores/queues-filter';
import type { GetQueuesForDrawerQuery } from '@/typings/gql';

export const useFilteredQueues = (
  queues?: GetQueuesForDrawerQuery['queues'],
) => {
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
