import { useMemo } from 'react';
import type { JobStatus } from '@/typings/gql';
import shallow from 'zustand/shallow';
import { useFiltersStore } from '@/stores/filters';
import { useActiveQueueStore } from '@/stores/active-queue';
import { useQueueData } from '@/hooks/use-queue-data';

export const useQueueCounts = () => {
  const activeQueue = useActiveQueueStore((state) => state.active as string);
  const queueData = useQueueData(activeQueue);
  const [activeStatus, changeStatus] = useFiltersStore(
    (state) => [state.status, state.changeStatus],
    shallow,
  );
  return useMemo(() => {
    if (!queueData?.jobsCounts) {
      return [];
    }
    return Object.entries(queueData.jobsCounts).map(([status, count]) => ({
      label: status,
      value: count,
      onClick: () => changeStatus(status as JobStatus),
      isActive: status === activeStatus,
    }));
  }, [queueData, activeStatus]);
};
