import { useMemo } from 'react';
import { JobStatus } from '@/typings/gql';
import shallow from 'zustand/shallow';
import { useFiltersStore } from '@/stores/filters';
import { QueryKeysConfig } from '@/config/query-keys';
import { useQuery } from 'react-query';
import { useActiveQueueStore } from '@/stores/active-queue';
import { useNetwork } from '@/hooks/use-network';

const JOB_STATUSES = [
  JobStatus.Active,
  JobStatus.Waiting,
  JobStatus.Completed,
  JobStatus.Delayed,
  JobStatus.Failed,
  JobStatus.Paused,
];

export const useQueueCounts = () => {
  const activeQueue = useActiveQueueStore((state) => state.active as string);
  const {
    queries: { getQueueCounts },
  } = useNetwork();
  const { data: counts } = useQuery(
    [QueryKeysConfig.queueCounts, activeQueue],
    () => getQueueCounts({ name: activeQueue }),
    {
      select: (data) => data?.queue?.jobsCounts,
    },
  );
  const [activeStatus, changeStatus] = useFiltersStore(
    (state) => [state.status, state.changeStatus],
    shallow,
  );
  return useMemo(() => {
    return JOB_STATUSES.map((status) => {
      return {
        label: status,
        value: counts?.[status] ?? 0,
        isActive: status === activeStatus,
        onClick: () => changeStatus(status),
      };
    });
  }, [counts, activeStatus]);
};
