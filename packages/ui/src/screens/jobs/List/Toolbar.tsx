import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useSelectedJobsStore } from '@/stores/selected-jobs';
import ReplayIcon from '@material-ui/icons/Replay';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { useFiltersStore } from '@/stores/filters';
import { JobStatus } from '@/typings/gql';
import { useNetwork } from '@/hooks/use-network';
import { useAbstractMutation } from '@/hooks/use-abstract-mutation';
import { useActiveQueueStore } from '@/stores/active-queue';

const useStyles = makeStyles((theme) => ({
  title: {
    marginRight: theme.spacing(3),
  },
}));

export default function TableToolbar() {
  const cls = useStyles();
  const activeStatus = useFiltersStore((state) => state.status);
  const queue = useActiveQueueStore((state) => state.active as string);
  const { mutations } = useNetwork();
  const [selectedJobs, clearSelectedJobs] = useSelectedJobsStore((state) => [
    state.selected,
    state.clear,
  ]);
  const selectedCount = selectedJobs.size;
  const removeMutation = useAbstractMutation({
    mutation: mutations.removeJobs,
    confirm: {
      description: 'Delete selected jobs',
    },
    invalidateSharedQueries: true,
    toast: 'Jobs have been removed',
    onSuccess: clearSelectedJobs,
  });
  const retryMutation = useAbstractMutation({
    mutation: mutations.retryJobs,
    confirm: {
      description: 'Retry selected jobs',
    },
    invalidateSharedQueries: true,
    toast: 'Retried',
    onSuccess: clearSelectedJobs,
  });
  return (
    <Toolbar>
      {selectedCount > 0 ? (
        <>
          <Typography
            className={cls.title}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {selectedCount} selected
          </Typography>
          {activeStatus === JobStatus.Failed && (
            <Tooltip title="Retry selected jobs">
              <IconButton
                onClick={() =>
                  retryMutation.mutate({
                    queue,
                    jobs: Array.from(selectedJobs),
                  })
                }
              >
                <ReplayIcon />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Delete selected jobs">
            <IconButton
              onClick={() =>
                removeMutation.mutate({
                  queue,
                  jobs: Array.from(selectedJobs),
                })
              }
              color="secondary"
            >
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </>
      ) : (
        <Typography variant="h6" component="div">
          Jobs
        </Typography>
      )}
    </Toolbar>
  );
}
