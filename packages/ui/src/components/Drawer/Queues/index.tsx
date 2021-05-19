import React, { useCallback } from 'react';
import type { GetQueuesQuery, JobStatus } from '@/typings/gql';
import List from '@material-ui/core/List';
import { useDrawerState } from '@/stores/drawer';
import { useActiveQueueStore } from '@/stores/active-queue';
import shallow from 'zustand/shallow';
import Queue from './Queue';
import { useQueuesCollapseStore } from '@/stores/queues-collapse';
import { useFiltersStore } from '@/stores/filters';

type TProps = {
  queues?: GetQueuesQuery['queues'];
};
export default function DrawerQueuesList({ queues }: TProps) {
  const [activeQueue, changeActiveQueue] = useActiveQueueStore(
    (state) => [state.active, state.changeActive],
    shallow,
  );
  const [collapseMap, toggleCollapse] = useQueuesCollapseStore(
    (state) => [state.queues, state.toggle],
    shallow,
  );
  const [activeStatus, changeActiveStatus] = useFiltersStore(
    (state) => [state.status, state.changeStatus],
    shallow,
  );
  const closeDrawer = useDrawerState((state) => state.close);
  const onSelect = useCallback((queue: string) => {
    changeActiveQueue(queue);
    closeDrawer();
  }, []);
  const onStatusSelect = useCallback((queue: string, status: JobStatus) => {
    changeActiveQueue(queue);
    changeActiveStatus(status);
    closeDrawer();
  }, []);
  return (
    <List>
      {queues?.map((queue) => (
        <Queue
          isExpanded={Boolean(collapseMap[queue.name])}
          activeStatus={activeStatus}
          onSelect={onSelect}
          onStatusSelect={onStatusSelect}
          toggleCollapse={toggleCollapse}
          isSelected={activeQueue === queue.name}
          key={queue.name}
          queue={queue}
        />
      ))}
    </List>
  );
}
