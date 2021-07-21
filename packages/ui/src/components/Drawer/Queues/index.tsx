import React, { useCallback } from 'react';
import type { GetQueuesQuery, JobStatus } from '@/typings/gql';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import { useDrawerState } from '@/stores/drawer';
import shallow from 'zustand/shallow';
import Queue from './Queue';
import { useQueuesCollapseStore } from '@/stores/queues-collapse';
import { useAtom } from 'jotai';
import { activeQueueAtom, activeStatusAtom } from '@/atoms/workspaces';
import { useMaybeGroupQueuesByPrefix } from './hooks';

type TProps = {
  queues: NonNullable<GetQueuesQuery['queues']>;
};
export default function DrawerQueuesList({ queues }: TProps) {
  const groupedQueues = useMaybeGroupQueuesByPrefix(queues);
  const [activeQueue, changeActiveQueue] = useAtom(activeQueueAtom);
  const [collapseMap, toggleCollapse] = useQueuesCollapseStore(
    (state) => [state.queues, state.toggle],
    shallow,
  );
  const [activeStatus, changeActiveStatus] = useAtom(activeStatusAtom);
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
  const renderQueue = (queue: TProps['queues'][0]) => {
    return (
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
    );
  };
  if (groupedQueues) {
    return (
      <List>
        {Object.entries(groupedQueues).map(([prefix, queues]) => (
          <List
            key={prefix}
            subheader={<ListSubheader>{prefix}</ListSubheader>}
          >
            {queues.map(renderQueue)}
          </List>
        ))}
      </List>
    );
  }
  return <List>{queues.map(renderQueue)}</List>;
}
