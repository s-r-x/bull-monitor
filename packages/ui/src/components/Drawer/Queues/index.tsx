import React, { useCallback } from 'react';
import type { GetQueuesQuery } from '@/typings/gql';
import List from '@material-ui/core/List';
import { useDrawerState } from '@/stores/drawer';
import { useActiveQueueStore } from '@/stores/active-queue';
import shallow from 'zustand/shallow';
import Queue from './Queue';

type TProps = {
  queues?: GetQueuesQuery['queues'];
};
export default function DrawerQueuesList({ queues }: TProps) {
  const [activeQueue, changeActiveQueue] = useActiveQueueStore(
    (state) => [state.active, state.changeActive],
    shallow,
  );
  const closeDrawer = useDrawerState((state) => state.close);
  const onSelect = useCallback((queue: string) => {
    changeActiveQueue(queue);
    closeDrawer();
  }, []);
  return (
    <List>
      {queues?.map((queue) => (
        <Queue
          onSelect={onSelect}
          isSelected={activeQueue === queue.name}
          key={queue.name}
          queue={queue}
        />
      ))}
    </List>
  );
}
