import React from 'react';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import { useCreateJobStore } from '@/stores/create-job';
import Button from '@material-ui/core/Button';
import { useNetwork } from '@/hooks/use-network';
import AddIcon from '@material-ui/icons/Add';
import { useAbstractMutation } from '@/hooks/use-abstract-mutation';
import { useRemoveJobsModalStore } from '@/stores/remove-jobs-modal';
import { useIsQueuePaused } from './hooks';
import { JobStatusClean } from '@/typings/gql';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import { useRefetchJobsLockStore } from '@/stores/refetch-jobs-lock';
import shallow from 'zustand/shallow';
import { getPollingInterval } from '@/stores/network-settings';
import { activeQueueAtom } from '@/atoms/workspaces';
import { useAtomValue } from 'jotai/utils';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}));
export default function QueueActions() {
  const classes = useStyles();
  const [cleanAnchorEl, setCleanAnchorEl] = React.useState<null | HTMLElement>(
    null,
  );
  const [moreAnchorEl, setMoreAnchorEl] = React.useState<null | HTMLElement>(
    null,
  );
  const [isRefetchLocked, toggleIsRefetchLocked] = useRefetchJobsLockStore(
    (state) => [state.isLocked, state.toggle],
    shallow,
  );
  const pollingInterval = getPollingInterval();
  const handleClickClean = (event: React.MouseEvent<HTMLButtonElement>) => {
    setCleanAnchorEl(event.currentTarget);
  };

  const handleCloseClean = () => {
    setCleanAnchorEl(null);
  };
  const handleClickMore = (event: React.MouseEvent<HTMLButtonElement>) => {
    setMoreAnchorEl(event.currentTarget);
  };
  const handleCloseMore = () => {
    setMoreAnchorEl(null);
  };
  const handleToggleRefetch = () => {
    toggleIsRefetchLocked();
    handleCloseMore();
  };

  const queue = useAtomValue(activeQueueAtom) as string;
  const {
    mutations: { pauseQueue, resumeQueue, emptyQueue, cleanQueue },
  } = useNetwork();
  const isQueuePaused = useIsQueuePaused(queue);
  const openRemoveJobsModal = useRemoveJobsModalStore((state) => state.open);
  const pauseMutation = useAbstractMutation({
    mutation: pauseQueue,
    toast: 'Queue has been paused',
    invalidateSharedQueries: true,
    confirm: {
      description: 'Pause queue',
    },
    onSuccess: handleCloseMore,
  });
  const emptyMutation = useAbstractMutation({
    mutation: emptyQueue,
    invalidateSharedQueries: true,
    toast: 'Queue has been emptied',
    confirm: {
      description: 'Empty queue',
    },
    onSuccess: handleCloseMore,
  });
  const resumeMutation = useAbstractMutation({
    mutation: resumeQueue,
    invalidateSharedQueries: true,
    toast: 'Queue has been resumed',
    onSuccess: handleCloseMore,
  });
  const cleanMutation = useAbstractMutation({
    mutation: cleanQueue,
    toast: 'Cleaned',
    invalidateSharedQueries: true,
    confirm: {
      description: 'Clean queue',
    },
  });
  const clean = async (status: JobStatusClean) => {
    await cleanMutation.mutateAsync({
      ...sharedMutationArg,
      status,
    });
    handleCloseClean();
  };
  const sharedMutationArg = { queue };
  const openCreateJob = useCreateJobStore((state) => state.open);
  return (
    <Paper className={classes.root}>
      <Button
        onClick={openCreateJob}
        variant="contained"
        startIcon={<AddIcon />}
        color="primary"
      >
        Add job
      </Button>
      <Button
        onClick={handleClickClean}
        color="secondary"
        aria-controls="clean-queue-menu"
        aria-haspopup="true"
      >
        clean
      </Button>
      <Menu
        id="clean-queue-menu"
        anchorEl={cleanAnchorEl}
        open={Boolean(cleanAnchorEl)}
        onClose={handleCloseClean}
      >
        <MenuItem onClick={() => clean(JobStatusClean.Wait)}>Waiting</MenuItem>
        <MenuItem onClick={() => clean(JobStatusClean.Active)}>Active</MenuItem>
        <MenuItem onClick={() => clean(JobStatusClean.Completed)}>
          Completed
        </MenuItem>
        <MenuItem onClick={() => clean(JobStatusClean.Delayed)}>
          Delayed
        </MenuItem>
        <MenuItem onClick={() => clean(JobStatusClean.Failed)}>Failed</MenuItem>
        <MenuItem onClick={() => clean(JobStatusClean.Paused)}>Paused</MenuItem>
      </Menu>
      <IconButton
        onClick={handleClickMore}
        aria-controls="more-queue-actions-menu"
        aria-haspopup="true"
      >
        <MoreIcon />
      </IconButton>
      <Menu
        id="more-queue-actions-menu"
        anchorEl={moreAnchorEl}
        open={Boolean(moreAnchorEl)}
        onClose={handleCloseMore}
      >
        {pollingInterval && (
          <MenuItem onClick={handleToggleRefetch}>
            {isRefetchLocked ? 'Enable jobs polling' : 'Disable jobs polling'}
          </MenuItem>
        )}
        <MenuItem onClick={openRemoveJobsModal}>
          Remove jobs by pattern
        </MenuItem>
        {isQueuePaused ? (
          <MenuItem onClick={() => resumeMutation.mutate(sharedMutationArg)}>
            Resume
          </MenuItem>
        ) : (
          <MenuItem onClick={() => pauseMutation.mutate(sharedMutationArg)}>
            Pause
          </MenuItem>
        )}
        <MenuItem onClick={() => emptyMutation.mutate(sharedMutationArg)}>
          Empty
        </MenuItem>
      </Menu>
    </Paper>
  );
}
