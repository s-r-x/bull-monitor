import { useMemo } from 'react';
import { QueryKeysConfig } from '@/config/query-keys';
import { useQuery } from 'react-query';
import { useActiveQueueStore } from '@/stores/active-queue';
import { useNetwork } from '@/hooks/use-network';
import { useFiltersStore } from '@/stores/filters';

export const useCount = (): number => {
  const status = useFiltersStore((state) => state.status);
  const activeQueue = useActiveQueueStore((state) => state.active);
  const {
    queries: { getQueueCounts },
  } = useNetwork();
  const { data } = useQuery(
    [QueryKeysConfig.queueCounts, activeQueue],
    () => getQueueCounts({ name: activeQueue as string }),
    {
      refetchOnMount: false,
      refetchOnWindowFocus: false,
    },
  );
  return useMemo(() => {
    if (!data?.queue?.jobsCounts) {
      return 0;
    }
    if (status in data.queue.jobsCounts) {
      return data.queue.jobsCounts[status];
    }
    return 0;
  }, [data, status]);
};
