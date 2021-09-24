import React from 'react';
import BaseAppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import { makeStyles } from '@material-ui/core/styles';
import type { Theme } from '@material-ui/core/styles';
import { useDrawerState } from '@/stores/drawer';
import SettingsIcon from '@material-ui/icons/Settings';
import ShareIcon from '@material-ui/icons/Share';
import { useSettingsModalStore } from '@/stores/settings-modal';
import Tooltip from '@material-ui/core/Tooltip';
import Box from '@material-ui/core/Box';
import { useRedisInfoModalStore } from '@/stores/redis-info-modal';
import RedisLogo from '../RedisLogo';
import Logo from '../Logo';
import { useShareActiveWorkspace } from '@/hooks/use-share';
import MetricsScreenIcon from '@material-ui/icons/Timeline';
import JobsScreenIcon from '@material-ui/icons/ViewList';
import { useActiveScreenStore } from '@/stores/active-screen';

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  menuButton: {
    marginRight: theme.spacing(0.5),
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  right: {
    display: 'flex',
    alignItems: 'center',
  },
}));

export default function AppBar() {
  const classes = useStyles();
  const toggleDrawer = useDrawerState((state) => state.toggle);
  const openSettings = useSettingsModalStore((state) => state.open);
  const openRedisInfo = useRedisInfoModalStore((state) => state.open);
  const shareWorkspace = useShareActiveWorkspace();
  const { screen, toggleScreen } = useActiveScreenStore();

  return (
    <BaseAppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={toggleDrawer}
          className={classes.menuButton}
        >
          <MenuIcon />
        </IconButton>
        <Logo fill="white" width="130" />
        <Box className={classes.right} marginLeft="auto">
          <Tooltip title="Redis info">
            <IconButton onClick={openRedisInfo} aria-label="redis info">
              <RedisLogo width="24" />
            </IconButton>
          </Tooltip>
          <Tooltip title="Share active workspace">
            <IconButton
              onClick={shareWorkspace}
              color="inherit"
              aria-label="share active workspace"
            >
              <ShareIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title={screen === 'jobs' ? 'Metrics' : 'Jobs'}>
            <IconButton color="inherit" onClick={toggleScreen}>
              {screen === 'jobs' ? <MetricsScreenIcon /> : <JobsScreenIcon />}
            </IconButton>
          </Tooltip>
          <Tooltip title="Settings">
            <IconButton
              onClick={openSettings}
              color="inherit"
              aria-label="settings"
            >
              <SettingsIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
    </BaseAppBar>
  );
}
