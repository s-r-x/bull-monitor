import React from 'react';
import Paper from '@mui/material/Paper';
import makeStyles from '@mui/styles/makeStyles';
import { useCreateJobStore } from '@/stores/create-job';
import Button from '@mui/material/Button';
import { useNetwork } from '@/hooks/use-network';
import AddIcon from '@mui/icons-material/Add';
import { useAbstractMutation } from '@/hooks/use-abstract-mutation';
import { useRemoveJobsModalStore } from '@/stores/remove-jobs-modal';
import { JobStatusClean, QueueProvider } from '@/typings/gql';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MoreIcon from '@mui/icons-material/MoreHoriz';
import { useRefetchJobsLockStore } from '@/stores/refetch-jobs-lock';
import shallow from 'zustand/shallow';
import { getPollingInterval } from '@/stores/network-settings';
import {
  activeQueueAtom,
  activeStatusAtom,
  jobIdAtom,
  dataSearchAtom,
} from '@/atoms/workspaces';
import { useAtomValue } from 'jotai/utils';
import SaveIcon from '@mui/icons-material/Save';
import Tooltip from '@mui/material/Tooltip';
import { useExportJobsMutation } from '@/hooks/use-export-jobs-mutation';
import { useQueueData } from '@/hooks/use-queue-data';

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
    null
  );
  React.useState<null | HTMLElement>(null);
  const [moreAnchorEl, setMoreAnchorEl] = React.useState<null | HTMLElement>(
    null
  );
  const [isRefetchLocked, toggleIsRefetchLocked] = useRefetchJobsLockStore(
    (state) => [state.isLocked, state.toggle],
    shallow
  );
  const exportMutation = useExportJobsMutation();
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
  const status = useAtomValue(activeStatusAtom);
  const jobId = useAtomValue(jobIdAtom);
  const dataSearch = useAtomValue(dataSearchAtom);
  const {
    mutations: { pauseQueue, resumeQueue, emptyQueue, cleanQueue },
  } = useNetwork();
  const queueData = useQueueData(queue);
  const isQueuePaused = queueData?.isPaused;
  const isReadonly = !!queueData?.readonly;
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
        disabled={isReadonly}
        startIcon={<AddIcon />}
        color="primary"
      >
        Add job
      </Button>
      <Button
        onClick={handleClickClean}
        color="secondary"
        disabled={isReadonly}
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
      <Tooltip title="Export jobs as JSON">
        <IconButton
          onClick={() => {
            exportMutation.mutate({
              queue,
              status,
              id: jobId,
              dataSearch,
            });
          }}
          size="large"
        >
          <SaveIcon />
        </IconButton>
      </Tooltip>
      <IconButton
        onClick={handleClickMore}
        disabled={isReadonly}
        aria-controls="more-queue-actions-menu"
        aria-haspopup="true"
        size="large"
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
        {queueData?.provider === QueueProvider.Bull && (
          <MenuItem onClick={openRemoveJobsModal}>
            Remove jobs by pattern
          </MenuItem>
        )}
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
