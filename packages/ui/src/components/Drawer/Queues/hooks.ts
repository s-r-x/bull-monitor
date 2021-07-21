import { usePreferencesStore } from '@/stores/preferences';
import type { GetQueuesQuery, JobStatus, QueueJobsCounts } from '@/typings/gql';
import { useMemo } from 'react';
import groupBy from 'lodash/groupBy';

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
export const useMaybeGroupQueuesByPrefix = (
  queues: NonNullable<GetQueuesQuery['queues']>,
) => {
  const shouldGroup = usePreferencesStore((state) => state.groupQueuesByPrefix);
  if (!shouldGroup) {
    return null;
  }
  return groupBy(queues, 'keyPrefix');
};
