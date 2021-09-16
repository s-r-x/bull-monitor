import { usePreferencesStore } from '@/stores/preferences';
import type { GetQueuesQuery, JobStatus, QueueJobsCounts } from '@/typings/gql';
import { useMemo } from 'react';
import groupBy from 'lodash/groupBy';

type QueueFromQuery = NonNullable<GetQueuesQuery['queues']>[0];
export const useJobsCountArray = (count: QueueJobsCounts) => {
  return useMemo(() => {
    return Object.entries(count).map(([status, count]) => ({
      status: status as JobStatus,
      count,
    }));
  }, [count]);
};
export const useQueueWorkspaceLabel = (queue: QueueFromQuery): string => {
  if (!queue.keyPrefix || queue.keyPrefix === 'bull') {
    return queue.name;
  }
  return queue.keyPrefix + ' ' + queue.name;
};
export const useMaybeGroupQueuesByPrefix = (queues: QueueFromQuery[]) => {
  const shouldGroup = usePreferencesStore((state) => state.groupQueuesByPrefix);
  if (!shouldGroup) {
    return null;
  }
  return groupBy(queues, 'keyPrefix');
};

export const useShouldRenderStatusesPie = (queue: QueueFromQuery): boolean => {
  const pref = usePreferencesStore((state) => state.showStatusesPieInDrawer);
  return useMemo(() => {
    if (!pref || queue.isPaused) return false;
    // show pie only if there are at least two different non zero statuses
    const [firstCount, secondCount] = Object.values(queue.jobsCounts).sort(
      (a, b) => b - a
    );
    return firstCount > 0 && secondCount > 0;
  }, [pref, queue.isPaused, queue.jobsCounts]);
};
