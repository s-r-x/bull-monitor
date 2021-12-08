import React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import makeStyles from '@mui/styles/makeStyles';
import Drawer from './Drawer';
import AppBar from './AppBar';
import SettingsModal from '../components/Settings';
import RedisInfoModal from '../components/RedisInfo';
import { useCreateFirstWorkspace } from '@/hooks/use-create-first-workspace';
import { useDrawerState } from '@/stores/drawer';
import { useAtomValue } from 'jotai/utils';
import { activeQueueAtom } from '@/atoms/workspaces';
import WorkspacePicker from './WorkspacePicker';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '100%',
    [theme.breakpoints.up('md')]: {
      maxWidth: 'calc(100% - var(--drawer-width) - 1px)',
    },
    flexGrow: 1,
    padding: theme.spacing(1),
  },
}));

const Shell: React.FC = (props) => {
  const classes = useStyles();
  useCreateFirstWorkspace();
  const drawerWidth = useDrawerState((state) => state.defaultWidth);
  const activeQueue = useAtomValue(activeQueueAtom);
  const rootStyle = {
    '--drawer-width': drawerWidth + 'px',
  } as React.CSSProperties;
  return (
    <div style={rootStyle} className={classes.root}>
      <CssBaseline />
      <AppBar />
      <Drawer />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {activeQueue && (
          <>
            <WorkspacePicker />
            {props.children}
          </>
        )}
      </main>
      <SettingsModal />
      <RedisInfoModal />
    </div>
  );
};

export default Shell;
