import React, { memo, useCallback } from 'react';
import type { GetQueuesQuery } from '@/typings/gql';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import JobsCount from './JobsCount';
import PauseIcon from '@material-ui/icons/Pause';
import { makeStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import Typography from '@material-ui/core/Typography';
import { useJobsCountArray, useQueueWorkspaceLabel } from './hooks';
import StatusesPie from './QueueStatusesPie';

const useStyles = makeStyles((theme) => ({
  listItem: {
    paddingLeft: theme.spacing(0.5),
    paddingRight: theme.spacing(1),
    '& .MuiListItemIcon-root': {
      minWidth: 32,
    },
  },
}));

type TProps = {
  queue: NonNullable<GetQueuesQuery['queues']>[0];
  isSelected: boolean;

  onSelect: (queue: string, label: string) => void;
};
const DrawerQueue = (props: TProps) => {
  const cls = useStyles();
  const workspaceLabel = useQueueWorkspaceLabel(props.queue);
  const { id } = props.queue;
  const onSelect = useCallback(() => {
    props.onSelect(id, workspaceLabel);
  }, [id, workspaceLabel]);
  const countArray = useJobsCountArray(props.queue.jobsCounts);
  return (
    <ListItem
      onClick={onSelect}
      selected={props.isSelected}
      className={cls.listItem}
      dense
      button
    >
      <ListItemIcon>
        {props.queue.isPaused ? (
          <ListItemIcon>
            <Badge color="secondary" showZero>
              <PauseIcon />
            </Badge>
          </ListItemIcon>
        ) : (
          <StatusesPie count={countArray} />
        )}
      </ListItemIcon>
      <ListItemText
        disableTypography
        primary={
          <Typography
            style={{
              textOverflow: 'ellipsis',
              overflow: 'hidden',
              whiteSpace: 'nowrap',
            }}
          >
            {props.queue.name}
          </Typography>
        }
        secondary={<JobsCount count={countArray} />}
      />
    </ListItem>
  );
};

export default memo(DrawerQueue);
