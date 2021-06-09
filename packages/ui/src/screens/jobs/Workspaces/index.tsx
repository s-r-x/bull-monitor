import React from 'react';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import {
  activeWorkspaceIdAtom,
  addWorkspaceAtom,
  activeQueueAtom,
  removeWorkspaceAtom,
  workspacesListAtom,
  workspacesSizeAtom,
} from '@/atoms/workspaces';
import { useAtom } from 'jotai';
import { WorkspacesConfig } from '@/config/workspaces';

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
    [theme.breakpoints.down('md')]: {
      maxWidth: '100%',
      overflowX: 'auto',
      flexWrap: 'nowrap',
      '-webkit-overflow-scrolling': 'touch',
    },
  },
}));

export default function Workspaces() {
  const workspaces = useAtomValue(workspacesListAtom);
  const [activeWorkspace, changeActiveWorkspace] = useAtom(
    activeWorkspaceIdAtom,
  );
  const workspacesSize = useAtomValue(workspacesSizeAtom);
  const addWorkspace = useUpdateAtom(addWorkspaceAtom);
  const queue = useAtomValue(activeQueueAtom) as string;
  const removeWorkspace = useUpdateAtom(removeWorkspaceAtom);
  const cls = useStyles();
  return (
    <Paper className={cls.root}>
      <div className={cls.chips}>
        {workspaces.map(({ id, label }) => (
          <Chip
            color={id === activeWorkspace ? 'primary' : 'default'}
            onDelete={
              workspacesSize > 1 ? () => removeWorkspace(id) : undefined
            }
            onClick={() => changeActiveWorkspace(id)}
            key={id}
            label={label}
          />
        ))}
        {workspacesSize < WorkspacesConfig.maxWorkspaces && (
          <Chip
            onClick={() => addWorkspace(queue)}
            icon={<AddIcon />}
            label="Add workspace"
            color="secondary"
          />
        )}
      </div>
    </Paper>
  );
}
