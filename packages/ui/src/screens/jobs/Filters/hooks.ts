import { useMemo } from 'react';
import { JobStatus } from '@/typings/gql';
import shallow from 'zustand/shallow';
import { useFiltersStore } from '@/stores/filters';
import { QueryKeysConfig } from '@/config/query-keys';
import { useQuery } from 'react-query';
import { useActiveQueueStore } from '@/stores/active-queue';
import { useNetwork } from '@/hooks/use-network';
import { useIsKeyPressedRef } from '@/hooks/use-is-key-pressed-ref';

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
  const isPressedRef = useIsKeyPressedRef({ key: 'Shift' });
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
  const [statuses, replaceStatus, toggleStatus] = useFiltersStore(
    (state) => [state.statuses, state.replaceStatus, state.toggleStatus],
    shallow,
  );
  return useMemo(() => {
    return JOB_STATUSES.map((status) => {
      const onClick = () =>
        isPressedRef.current ? toggleStatus(status) : replaceStatus(status);
      return {
        label: status,
        value: counts?.[status] ?? 0,
        isActive: statuses.includes(status),
        onClick,
      };
    });
  }, [counts, statuses]);
};
