import React from 'react';
import { JobStatus } from '@/typings/gql';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import MoreIcon from '@mui/icons-material/MoreHoriz';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { useDataEditorStore } from '@/stores/data-editor';
import { useJobLogsStore } from '@/stores/job-logs';
import { useAbstractMutation } from '@/hooks/use-abstract-mutation';
import { useNetwork } from '@/hooks/use-network';
import Popover from '@mui/material/Popover';
import JobInfo from './Info';
import { useExportJobsMutation } from '@/hooks/use-export-jobs-mutation';
import { useToggle } from '@/hooks/use-toggle';
import { useShareJob } from '@/hooks/use-share';
import { useCreateJobStore } from '@/stores/create-job';
import type { TJobIdentity } from '@/typings';
import type { TJobProps } from './typings';

type TProps = Pick<TJobProps, 'job' | 'queue' | 'readonly'>;
const JobActions = ({ job, queue, readonly }: TProps) => {
  const { mutations } = useNetwork();
  const openDataEditor = useDataEditorStore((state) => state.open);
  const openNewJobEditor = useCreateJobStore((state) => state.setInputAndOpen);
  const openJobLogs = useJobLogsStore((state) => state.open);
  const infoPopoverId = `${job.id}-info-popover`;
  const infoPopoverAnchor = React.useRef<any>(null);
  const [infoOpen, toggleInfoOpen, setInfoOpen] = useToggle();
  const closeInfoPopover = () => setInfoOpen(false);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const shareJob = useShareJob();

  const handleClickMore = (event: React.MouseEvent<HTMLButtonElement>) =>
    setAnchorEl(event.currentTarget);
  const handleCloseMore = () => setAnchorEl(null);

  const removeMutation = useAbstractMutation({
    mutation: mutations.removeJob,
    confirm: {
      description: 'Delete job',
    },
    invalidateSharedQueries: true,
    toast: 'Job has been removed',
  });
  const moveToCompletedMutation = useAbstractMutation({
    mutation: mutations.moveJobToCompleted,
    toast: 'Moved to completed',
    invalidateSharedQueries: true,
  });
  const exportMutation = useExportJobsMutation();
  const promoteMutation = useAbstractMutation({
    mutation: mutations.promoteJob,
    toast: 'Promoted',
    invalidateSharedQueries: true,
  });
  const discardMutation = useAbstractMutation({
    mutation: mutations.discardJob,
    toast: 'Discarded',
  });
  const moveToFailedMutation = useAbstractMutation({
    mutation: mutations.moveJobToFailed,
    toast: 'Moved to failed',
    invalidateSharedQueries: true,
  });
  const retryMutation = useAbstractMutation({
    mutation: mutations.retryJob,
    toast: 'Retried',
    invalidateSharedQueries: true,
  });
  const sharedMutationArg: TJobIdentity = { queue, id: job.id };
  return (
    <>
      <Tooltip title="Data">
        <IconButton
          disabled={readonly}
          size="small"
          onClick={() => openDataEditor(sharedMutationArg)}
          color="primary"
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete job">
        <IconButton
          disabled={readonly}
          size="small"
          onClick={() => removeMutation.mutate(sharedMutationArg)}
          color="secondary"
        >
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <IconButton
        aria-haspopup="true"
        aria-owns={infoPopoverId}
        ref={infoPopoverAnchor}
        onClick={toggleInfoOpen}
        size="small"
      >
        <InfoIcon />
      </IconButton>
      <Popover
        id={infoPopoverId}
        onClose={closeInfoPopover}
        open={infoOpen}
        anchorEl={infoPopoverAnchor.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <JobInfo job={job} />
      </Popover>

      <Tooltip title="More">
        <IconButton size="small" onClick={handleClickMore}>
          <MoreIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMore}
        onClick={handleCloseMore}
      >
        {job.status === JobStatus.Completed && (
          <MenuItem
            disabled={readonly}
            onClick={() =>
              openNewJobEditor({
                name: job.name,
                data: job.data,
                options: job.opts,
              })
            }
          >
            Queue again
          </MenuItem>
        )}
        {job.status === JobStatus.Failed && (
          <MenuItem
            disabled={readonly}
            onClick={() => retryMutation.mutate(sharedMutationArg)}
          >
            Retry
          </MenuItem>
        )}
        {job.status === JobStatus.Waiting && (
          <MenuItem
            disabled={readonly}
            onClick={() => moveToCompletedMutation.mutate(sharedMutationArg)}
          >
            Move to completed
          </MenuItem>
        )}
        {job.status === JobStatus.Waiting && (
          <MenuItem
            disabled={readonly}
            onClick={() => moveToFailedMutation.mutate(sharedMutationArg)}
          >
            Move to failed
          </MenuItem>
        )}
        <MenuItem
          onClick={() =>
            exportMutation.mutate({
              queue,
              ids: [job.id],
            })
          }
        >
          Save as JSON
        </MenuItem>
        <MenuItem onClick={() => shareJob(job.id)}>Share</MenuItem>
        {job.status === JobStatus.Delayed && (
          <MenuItem
            disabled={readonly}
            onClick={() => promoteMutation.mutate(sharedMutationArg)}
          >
            Promote
          </MenuItem>
        )}
        <MenuItem
          disabled={readonly}
          onClick={() => discardMutation.mutate(sharedMutationArg)}
        >
          Discard
        </MenuItem>
        <MenuItem onClick={() => openJobLogs(sharedMutationArg)}>Logs</MenuItem>
      </Menu>
    </>
  );
};
export default JobActions;
