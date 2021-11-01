import React from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useSelectedJobsStore } from '@/stores/selected-jobs';
import ReplayIcon from '@material-ui/icons/Replay';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';
import SaveIcon from '@material-ui/icons/Save';
import Tooltip from '@material-ui/core/Tooltip';
import { JobStatus } from '@/typings/gql';
import { useNetwork } from '@/hooks/use-network';
import { useAbstractMutation } from '@/hooks/use-abstract-mutation';
import { useExportJobsMutation } from '@/hooks/use-export-jobs-mutation';
import { activeStatusAtom } from '@/atoms/workspaces';
import { useAtomValue } from 'jotai/utils';

const useStyles = makeStyles((theme) => ({
  title: {
    marginRight: theme.spacing(3),
  },
}));

type TProps = {
  queue: string;
  readonly: boolean;
};
export default function TableToolbar({ queue, readonly }: TProps) {
  const cls = useStyles();
  const activeStatus = useAtomValue(activeStatusAtom);
  const { mutations } = useNetwork();
  const [selectedJobs, clearSelectedJobs] = useSelectedJobsStore((state) => [
    state.selected,
    state.clear,
  ]);
  const exportMutation = useExportJobsMutation();
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
                disabled={readonly}
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
              disabled={readonly}
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
          <Tooltip title="Save as JSON">
            <IconButton
              onClick={() =>
                exportMutation.mutate({
                  queue,
                  ids: Array.from(selectedJobs),
                })
              }
            >
              <SaveIcon />
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
