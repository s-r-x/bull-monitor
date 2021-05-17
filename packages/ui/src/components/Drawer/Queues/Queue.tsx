import React, { useCallback } from 'react';
import type { GetQueuesQuery } from '@/typings/gql';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import JobsCount from './JobsCount';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import InboxIcon from '@material-ui/icons/MoveToInbox';

import { makeStyles } from '@material-ui/core/styles';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import { useToggle } from '@/hooks/use-toggle';
import Collapse from '@material-ui/core/Collapse';
import Badge from '@material-ui/core/Badge';
import { useAliveJobsCount } from './hooks';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'relative',
  },
  collapseBtn: {
    position: 'absolute',
    right: theme.spacing(0.5),
    top: '9px',
  },
  countChip: {
    minWidth: '46px',
  },
  icon: {
    minWidth: '32px',
  },
}));

type TProps = {
  queue: NonNullable<GetQueuesQuery['queues']>[0];
  isSelected: boolean;
  onSelect: (queue: string) => void;
};
export default function DrawerQueue(props: TProps) {
  const cls = useStyles();
  const [isOpen, toggleIsOpen] = useToggle();
  const onSelect = useCallback(() => {
    props.onSelect(props.queue.name);
  }, [props.queue.name]);
  const aliveJobsCount = useAliveJobsCount(props.queue.jobsCounts);
  return (
    <li className={cls.root}>
      <ListItem
        ContainerComponent="div"
        onClick={onSelect}
        selected={props.isSelected}
        button
      >
        <ListItemIcon>
          <Badge
            badgeContent={aliveJobsCount}
            color="primary"
            max={9999}
            showZero
          >
            <InboxIcon />
          </Badge>
        </ListItemIcon>
        <ListItemText
          primaryTypographyProps={{
            style: {
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            },
          }}
          primary={props.queue.name}
        />
        <ListItemSecondaryAction />
      </ListItem>
      <IconButton
        onClick={toggleIsOpen}
        size="small"
        className={cls.collapseBtn}
      >
        {isOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </IconButton>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        <JobsCount jobsCounts={props.queue.jobsCounts} />
      </Collapse>
    </li>
  );
}
