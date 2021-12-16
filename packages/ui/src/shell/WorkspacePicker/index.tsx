import React from 'react';
import Chip from '@mui/material/Chip';
import Paper from '@mui/material/Paper';
import makeStyles from '@mui/styles/makeStyles';
import AddIcon from '@mui/icons-material/Add';
import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import {
  activeWorkspaceIdAtom,
  addWorkspaceAtom,
  activeQueueAtom,
  activeQueueLabelAtom,
  removeWorkspaceAtom,
  workspacesListAtom,
  workspacesSizeAtom,
} from '@/atoms/workspaces';
import { useAtom } from 'jotai';
import { WorkspacesConfig } from '@/config/workspaces';
import IconButton from '@mui/material/IconButton';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
    paddingBottom: 0,
  },
  chips: {
    display: 'flex',
    justifyContent: 'flex-start',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(1),
    '& > *': {
      margin: theme.spacing(0.5),
    },
    [theme.breakpoints.down('xl')]: {
      maxWidth: '100%',
      overflowX: 'auto',
      flexWrap: 'nowrap',
      '-webkit-overflow-scrolling': 'touch',
    },
  },
}));

export default function WorkspacePicker() {
  const workspaces = useAtomValue(workspacesListAtom);
  const [activeWorkspace, changeActiveWorkspace] = useAtom(
    activeWorkspaceIdAtom
  );
  const workspacesSize = useAtomValue(workspacesSizeAtom);
  const addWorkspace = useUpdateAtom(addWorkspaceAtom);
  const queue = useAtomValue(activeQueueAtom) as string;
  const queueLabel = useAtomValue(activeQueueLabelAtom) as string;
  const removeWorkspace = useUpdateAtom(removeWorkspaceAtom);
  const cls = useStyles();
  return (
    <Paper className={cls.root}>
      <div className={cls.chips}>
        {workspaces.map(({ id, queueLabel }) => (
          <Chip
            color={id === activeWorkspace ? 'primary' : 'default'}
            onDelete={
              workspacesSize > 1 ? () => removeWorkspace(id) : undefined
            }
            onClick={() => changeActiveWorkspace(id)}
            key={id}
            label={queueLabel}
          />
        ))}
        {workspacesSize < WorkspacesConfig.maxWorkspaces && (
          <IconButton
            onClick={() => addWorkspace({ queue, queueLabel })}
            aria-label="Add workspace"
            size="small"
          >
            <AddIcon />
          </IconButton>
        )}
      </div>
    </Paper>
  );
}
