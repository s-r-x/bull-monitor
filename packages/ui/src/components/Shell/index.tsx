import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import { makeStyles, Theme } from '@material-ui/core/styles';
import Drawer from '@/components/Drawer';
import AppBar from '@/components/AppBar';
import SettingsModal from '../Settings';
import { LayoutConfig } from '@/config/layouts';
import RedisInfoModal from '../RedisInfo';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    minHeight: '100vh',
  },
  toolbar: theme.mixins.toolbar,
  content: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: `calc(100% - ${LayoutConfig.drawerWidth}px)`,
    flexGrow: 1,
    padding: theme.spacing(2),
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
      padding: theme.spacing(1),
    },
  },
}));

const Shell: React.FC = (props) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar />
      <Drawer />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        {props.children}
      </main>
      <SettingsModal />
      <RedisInfoModal />
    </div>
  );
};

export default Shell;
