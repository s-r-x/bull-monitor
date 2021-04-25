import { useMemo } from 'react';
import { QueryKeysConfig } from '@/config/query-keys';
import { useQuery } from 'react-query';
import { useActiveQueueStore } from '@/stores/active-queue';
import isEmpty from 'lodash/isEmpty';
import type { JobStatus } from '@/typings/gql';
import { useNetwork } from '@/hooks/use-network';
import { useFiltersStore } from '@/stores/filters';

export const useCount = (): number => {
  const statuses = useFiltersStore((state) => state.statuses);
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
    return Object.entries(data.queue.jobsCounts).reduce(
      (acc, [queue, count]) => {
        if (isEmpty(statuses)) {
          return acc + count;
        } else {
          return statuses.includes(queue as JobStatus) ? acc + count : acc;
        }
      },
      0,
    );
  }, [data, statuses]);
};
