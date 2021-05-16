import React from 'react';
import type { GetQueuesForDrawerQuery } from '@/typings/gql';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useDrawerState } from '@/stores/drawer';
import { useActiveQueueStore } from '@/stores/active-queue';
import shallow from 'zustand/shallow';
import Badge from '@material-ui/core/Badge';

type TProps = {
  queues?: GetQueuesForDrawerQuery['queues'];
};
export default function DrawerQueuesList({ queues }: TProps) {
  const [activeQueue, changeActiveQueue] = useActiveQueueStore(
    (state) => [state.active, state.changeActive],
    shallow,
  );
  const closeDrawer = useDrawerState((state) => state.close);
  return (
    <List>
      {queues?.map((queue) => (
        <ListItem
          onClick={() => {
            changeActiveQueue(queue.name);
            closeDrawer();
          }}
          selected={queue.name === activeQueue}
          key={queue.name}
          button
        >
          <ListItemIcon>
            <Badge
              badgeContent={queue.count}
              color="primary"
              max={Infinity}
              showZero
            >
              <InboxIcon />
            </Badge>
          </ListItemIcon>
          <ListItemText primary={queue.name} />
        </ListItem>
      ))}
    </List>
  );
}
