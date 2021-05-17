import { useMemo } from 'react';
import { JobStatus } from '@/typings/gql';
import shallow from 'zustand/shallow';
import { useFiltersStore } from '@/stores/filters';
import { useActiveQueueStore } from '@/stores/active-queue';
import { useQueueData } from '@/hooks/use-queue-data';

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
  const queueData = useQueueData(activeQueue);
  const [activeStatus, changeStatus] = useFiltersStore(
    (state) => [state.status, state.changeStatus],
    shallow,
  );
  return useMemo(() => {
    return JOB_STATUSES.map((status) => {
      return {
        label: status,
        value: queueData?.jobsCounts?.[status] ?? 0,
        isActive: status === activeStatus,
        onClick: () => changeStatus(status),
      };
    });
  }, [queueData, activeStatus]);
};
