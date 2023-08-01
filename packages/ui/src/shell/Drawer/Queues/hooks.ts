import { usePreferencesStore } from '@/stores/preferences';
import type { GetQueuesQuery, JobStatus, QueueJobsCounts } from '@/typings/gql';
import { useMemo } from 'react';
import groupBy from 'lodash/groupBy';
import omitBy from 'lodash/omitBy';
import isNil from 'lodash/isNil';

type QueueFromQuery = NonNullable<GetQueuesQuery['queues']>[0];
export const useJobsCountArray = (count: QueueJobsCounts) => {
  return useMemo(() => {
    return Object.entries(omitBy(count, isNil)).map(([status, count]) => ({
      status: status as JobStatus,
      count: count as number,
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
