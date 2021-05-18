import type { JobStatus, QueueJobsCounts } from '@/typings/gql';
import { useMemo } from 'react';

export const useJobsCountArray = (count: QueueJobsCounts) => {
  return useMemo(() => {
    return Object.entries(count).map(([status, count]) => ({
      status: status as JobStatus,
      count,
    }));
  }, [count]);
};
export const useAliveJobsCount = (count: QueueJobsCounts) => {
  return count.active + count.delayed + count.waiting;
};
