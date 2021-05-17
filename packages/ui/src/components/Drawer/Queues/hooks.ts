import type { JobStatus, QueueJobsCounts } from '@/typings/gql';
import { useEffect, useMemo } from 'react';
import { useToggle } from '@/hooks/use-toggle';
import { eventEmitter } from '@/services/event-emitter';
import { usePreferencesStore } from '@/stores/preferences';

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

export const useCollapseState = () => {
  const expandByDefault = usePreferencesStore((state) => state.expandJobsCount);
  const state = useToggle(expandByDefault);
  useEffect(() => {
    const collapseCb = () => state[2](false);
    const expandCb = () => state[2](true);
    eventEmitter.on('drawer/collapseCounts', collapseCb);
    eventEmitter.on('drawer/expandCounts', expandCb);
    return () => {
      eventEmitter.off('drawer/collapseCounts', collapseCb);
      eventEmitter.off('drawer/expandCounts', expandCb);
    };
  }, []);
  return state;
};
