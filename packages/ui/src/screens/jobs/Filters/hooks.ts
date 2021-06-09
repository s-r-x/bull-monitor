import { useMemo } from 'react';
import type { JobStatus } from '@/typings/gql';
import { useQueueData } from '@/hooks/use-queue-data';
import { activeQueueAtom, activeStatusAtom } from '@/atoms/workspaces';
import { useAtomValue } from 'jotai/utils';
import { useAtom } from 'jotai';

export const useQueueCounts = () => {
  const activeQueue = useAtomValue(activeQueueAtom) as string;
  const queueData = useQueueData(activeQueue);
  const [activeStatus, changeStatus] = useAtom(activeStatusAtom);
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
