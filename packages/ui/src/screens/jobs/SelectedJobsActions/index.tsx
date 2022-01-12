import React from 'react';
import Typography from '@mui/material/Typography';
import makeStyles from '@mui/styles/makeStyles';
import { useSelectedJobsStore } from '@/stores/selected-jobs';
import ReplayIcon from '@mui/icons-material/Replay';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import SaveIcon from '@mui/icons-material/Save';
import Tooltip from '@mui/material/Tooltip';
import { JobStatus } from '@/typings/gql';
import { useNetwork } from '@/hooks/use-network';
import { useAbstractMutation } from '@/hooks/use-abstract-mutation';
import { useExportJobsMutation } from '@/hooks/use-export-jobs-mutation';
import { activeStatusAtom } from '@/atoms/workspaces';
import { activeQueueAtom } from '@/atoms/workspaces';
import { useAtomValue } from 'jotai/utils';
import { useQueueData } from '@/hooks/use-queue-data';

const useStyles = makeStyles((theme) => ({
  title: {
    marginRight: theme.spacing(3),
  },
}));

export default function SelectedJobsActions() {
  const queue = useAtomValue(activeQueueAtom) as string;
  const readonly = !!useQueueData(queue)?.readonly;
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
            size="large"
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
          size="large"
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
          size="large"
        >
          <SaveIcon />
        </IconButton>
      </Tooltip>
    </>
  );
}
