import React, { useCallback } from 'react';
import type { GetQueuesQuery, JobStatus } from '@/typings/gql';
import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import { useDrawerState } from '@/stores/drawer';
import shallow from 'zustand/shallow';
import Queue from './Queue';
import { useQueuesCollapseStore } from '@/stores/queues-collapse';
import { useAtom } from 'jotai';
import {
  activeQueueAtom,
  activeQueueLabelAtom,
  activeStatusAtom,
} from '@/atoms/workspaces';
import { useMaybeGroupQueuesByPrefix } from './hooks';
import { useUpdateAtom } from 'jotai/utils';

type TProps = {
  queues: NonNullable<GetQueuesQuery['queues']>;
};
export default function DrawerQueuesList({ queues }: TProps) {
  const groupedQueues = useMaybeGroupQueuesByPrefix(queues);
  const [activeQueue, changeActiveQueue] = useAtom(activeQueueAtom);
  const changeActiveQueueLabel = useUpdateAtom(activeQueueLabelAtom);
  const [collapseMap, toggleCollapse] = useQueuesCollapseStore(
    (state) => [state.queues, state.toggle],
    shallow,
  );
  const [activeStatus, changeActiveStatus] = useAtom(activeStatusAtom);
  const closeDrawer = useDrawerState((state) => state.close);
  const onSelect = useCallback((queue: string, label: string) => {
    changeActiveQueue(queue);
    changeActiveQueueLabel(label);
    closeDrawer();
  }, []);
  const onStatusSelect = useCallback(
    (queue: string, label: string, status: JobStatus) => {
      changeActiveQueue(queue);
      changeActiveQueueLabel(label);
      changeActiveStatus(status);
      closeDrawer();
    },
    [],
  );
  const renderQueue = (queue: TProps['queues'][0]) => {
    return (
      <Queue
        isExpanded={Boolean(collapseMap[queue.id])}
        activeStatus={activeStatus}
        onSelect={onSelect}
        onStatusSelect={onStatusSelect}
        toggleCollapse={toggleCollapse}
        isSelected={activeQueue === queue.id}
        key={queue.id}
        queue={queue}
      />
    );
  };
  if (groupedQueues) {
    return (
      <>
        {Object.entries(groupedQueues).map(([prefix, queues]) => (
          <List
            key={prefix}
            subheader={<ListSubheader>{prefix}</ListSubheader>}
          >
            {queues.map(renderQueue)}
          </List>
        ))}
      </>
    );
  }
  return <List>{queues.map(renderQueue)}</List>;
}
