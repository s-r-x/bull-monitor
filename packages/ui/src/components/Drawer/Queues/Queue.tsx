import React, { memo, useCallback } from 'react';
import type { GetQueuesQuery, JobStatus } from '@/typings/gql';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import JobsCount from './JobsCount';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import PauseIcon from '@material-ui/icons/Pause';
import { makeStyles } from '@material-ui/core/styles';
import ExpandLessIcon from '@material-ui/icons/ExpandLess';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
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
  activeStatus: JobStatus;
  isSelected: boolean;
  isExpanded: boolean;

  onSelect: (queue: string) => void;
  onStatusSelect: (queue: string, status: JobStatus) => void;
  toggleCollapse: (queue: string) => void;
};
const DrawerQueue = (props: TProps) => {
  const cls = useStyles();
  const onSelect = useCallback(() => {
    props.onSelect(props.queue.name);
  }, [props.queue.name]);
  const onStatusSelect = useCallback(
    (status: JobStatus) => {
      props.onStatusSelect(props.queue.name, status);
    },
    [props.queue.name],
  );
  const onToggleCollapse = useCallback(() => {
    props.toggleCollapse(props.queue.name);
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
            color="secondary"
            max={9999}
            showZero
          >
            {props.queue.isPaused ? <PauseIcon /> : <InboxIcon />}
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
        onClick={onToggleCollapse}
        size="small"
        className={cls.collapseBtn}
      >
        {props.isExpanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
      </IconButton>
      <Collapse in={props.isExpanded} timeout="auto" unmountOnExit>
        <JobsCount
          onSelect={onStatusSelect}
          isQueueSelected={props.isSelected}
          activeStatus={props.activeStatus}
          jobsCounts={props.queue.jobsCounts}
        />
      </Collapse>
    </li>
  );
};

export default memo(DrawerQueue);
