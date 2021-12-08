import React, { useCallback } from 'react';
import type { GetQueuesQuery } from '@/typings/gql';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import { useDrawerState } from '@/stores/drawer';
import Queue from './Queue';
import { useAtom } from 'jotai';
import { activeQueueAtom, activeQueueLabelAtom } from '@/atoms/workspaces';
import { useMaybeGroupQueuesByPrefix } from './hooks';
import { useUpdateAtom } from 'jotai/utils';

type TProps = {
  queues: NonNullable<GetQueuesQuery['queues']>;
};
export default function DrawerQueuesList({ queues }: TProps) {
  const groupedQueues = useMaybeGroupQueuesByPrefix(queues);
  const [activeQueue, changeActiveQueue] = useAtom(activeQueueAtom);
  const changeActiveQueueLabel = useUpdateAtom(activeQueueLabelAtom);
  const closeDrawer = useDrawerState((state) => state.close);
  const onSelect = useCallback((queue: string, label: string) => {
    changeActiveQueue(queue);
    changeActiveQueueLabel(label);
    closeDrawer();
  }, []);
  const renderQueue = (queue: TProps['queues'][0]) => {
    return (
      <Queue
        onSelect={onSelect}
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
