import React from 'react';
import { JobStatus } from '@/typings/gql';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import MoreIcon from '@material-ui/icons/MoreHoriz';
import Tooltip from '@material-ui/core/Tooltip';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useDataEditorStore } from '@/stores/data-editor';
import { useJobLogsStore } from '@/stores/job-logs';
import { useAbstractMutation } from '@/hooks/use-abstract-mutation';
import { useNetwork } from '@/hooks/use-network';
import type { TJobProps } from './typings';
import ScheduleIcon from '@material-ui/icons/Schedule';
import Popover from '@material-ui/core/Popover';
import SettingsIcon from '@material-ui/icons/Settings';
import Timeline from './Timeline';
import Options from './Options';
import { useExportJobsMutation } from '@/hooks/use-export-jobs-mutation';
import { makeStyles } from '@material-ui/core/styles';
import { useToggle } from '@/hooks/use-toggle';
import { useShareJob } from '@/hooks/use-share';
import type { TJobIdentity } from '@/typings';
import { useCreateJobStore } from '@/stores/create-job';

const useStyles = makeStyles((theme) => ({
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    pointerEvents: 'auto',
    padding: theme.spacing(1),
  },
}));

type TProps = Pick<TJobProps, 'job' | 'queue' | 'readonly'>;
const JobActions = ({ job, queue, readonly }: TProps) => {
  const cls = useStyles();
  const { mutations } = useNetwork();
  const openDataEditor = useDataEditorStore((state) => state.open);
  const openNewJobEditor = useCreateJobStore((state) => state.setInputAndOpen);
  const openJobLogs = useJobLogsStore((state) => state.open);
  const tlPopoverId = `${job.id}-tl-popover`;
  const optsPopoverId = `${job.id}-opts-popover`;
  const tlPopoverAnchor = React.useRef<any>(null);
  const optsPopoverAnchor = React.useRef<any>(null);
  const [tlOpen, toggleTlOpen, setTlOpen] = useToggle();
  const [optsOpen, toggleOptsOpen, setOptsOpen] = useToggle();
  const closeTlPopover = () => setTlOpen(false);
  const openOptsPopover = () => setOptsOpen(true);
  const closeOptsPopover = () => setOptsOpen(false);
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
        aria-owns={tlPopoverId}
        ref={tlPopoverAnchor}
        onClick={toggleTlOpen}
        size="small"
      >
        <ScheduleIcon />
      </IconButton>
      <Popover
        id={tlPopoverId}
        onClose={closeTlPopover}
        open={tlOpen}
        anchorEl={tlPopoverAnchor.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Timeline job={job} />
      </Popover>

      <IconButton
        aria-haspopup="true"
        aria-owns={optsPopoverId}
        ref={optsPopoverAnchor}
        onMouseEnter={openOptsPopover}
        onClick={toggleOptsOpen}
        onMouseLeave={closeOptsPopover}
        size="small"
      >
        <SettingsIcon />
      </IconButton>
      <Popover
        id={optsPopoverId}
        disableScrollLock
        onClose={closeOptsPopover}
        disableRestoreFocus
        className={cls.popover}
        // uncomment to allow mouse events on popover
        //classes={{
        //  paper: cls.paper,
        //}}
        //PaperProps={{
        //  onMouseEnter: openOptsPopover,
        //  onMouseLeave: closeOptsPopover,
        //}}
        open={optsOpen}
        anchorEl={optsPopoverAnchor.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        <Options options={job.opts} />
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
