import React, { useCallback } from 'react';
import type { GetQueuesQuery } from '@/typings/gql';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Badge from '@material-ui/core/Badge';

type TProps = {
  queue: NonNullable<GetQueuesQuery['queues']>[0];
  isSelected: boolean;
  onSelect: (queue: string) => void;
};
export default function DrawerQueuesList(props: TProps) {
  const onSelect = useCallback(() => {
    props.onSelect(props.queue.name);
  }, [props.queue.name]);
  return (
    <ListItem onClick={onSelect} selected={props.isSelected} button>
      <ListItemIcon>
        <Badge badgeContent={0} color="primary" max={Infinity} showZero>
          <InboxIcon />
        </Badge>
      </ListItemIcon>
      <ListItemText primary={props.queue.name} />
    </ListItem>
  );
}
