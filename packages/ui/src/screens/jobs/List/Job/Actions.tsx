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
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';

type TProps = TJobProps & {
  expanded: boolean;
  toggleExpanded: () => void;
};
const JobActions = ({ job, queue, expanded, toggleExpanded }: TProps) => {
  const { mutations } = useNetwork();
  const openDataEditor = useDataEditorStore((state) => state.open);
  const openJobLogs = useJobLogsStore((state) => state.open);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
    toast: 'Moved to completed',
    invalidateSharedQueries: true,
  });
  const retryMutation = useAbstractMutation({
    mutation: mutations.retryJob,
    toast: 'Retried',
    invalidateSharedQueries: true,
  });
  const sharedMutationArg = { queue, id: job.id };
  const moveToCompleted = () =>
    moveToCompletedMutation.mutate(sharedMutationArg);
  const moveToFailed = () => moveToFailedMutation.mutate(sharedMutationArg);
  const remove = () => removeMutation.mutate(sharedMutationArg);
  const discard = () => discardMutation.mutate(sharedMutationArg);
  const promote = () => promoteMutation.mutate(sharedMutationArg);
  const retry = () => retryMutation.mutate(sharedMutationArg);
  return (
    <>
      <IconButton aria-label="expand row" size="small" onClick={toggleExpanded}>
        {expanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
      </IconButton>
      <Tooltip title="Data">
        <IconButton
          size="small"
          onClick={() => openDataEditor(sharedMutationArg)}
          color="primary"
        >
          <EditIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Delete job">
        <IconButton size="small" onClick={remove} color="secondary">
          <DeleteIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="More">
        <IconButton size="small" onClick={handleClick}>
          <MoreIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        onClick={handleClose}
      >
        <MenuItem onClick={() => openJobLogs(sharedMutationArg)}>Logs</MenuItem>
        {job.status === JobStatus.Failed && (
          <MenuItem onClick={retry}>Retry</MenuItem>
        )}
        {job.status === JobStatus.Waiting && (
          <MenuItem onClick={moveToCompleted}>Move to completed</MenuItem>
        )}
        {job.status === JobStatus.Waiting && (
          <MenuItem onClick={moveToFailed}>Move to failed</MenuItem>
        )}
        {job.status === JobStatus.Delayed && (
          <MenuItem onClick={promote}>Promote</MenuItem>
        )}
        <MenuItem onClick={discard}>Discard</MenuItem>
      </Menu>
    </>
  );
};
export default JobActions;
