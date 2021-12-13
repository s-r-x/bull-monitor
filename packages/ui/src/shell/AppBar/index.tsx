import React, { useCallback, memo } from 'react';
import BaseAppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import GitHubIcon from '@material-ui/icons/GitHub';
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
import RedisLogo from '@/components/RedisLogo';
import Logo from '@/components/Logo';
import { useShareActiveWorkspace } from '@/hooks/use-share';
import MetricsScreenIcon from '@material-ui/icons/Timeline';
import JobsScreenIcon from '@material-ui/icons/ViewList';
import { useActiveScreenStore } from '@/stores/active-screen';
import { LinksConfig } from '@/config/links';
import { EnvConfig } from '@/config/env';
import { useQueryClient } from 'react-query';
import { QueryKeysConfig } from '@/config/query-keys';
import { useNetwork } from '@/hooks/use-network';

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

export default memo(function AppBar() {
  const queryClient = useQueryClient();
  const {
    queries: { getRedisInfo },
  } = useNetwork();

  const onRedisHover = useCallback(() => {
    queryClient.prefetchQuery(QueryKeysConfig.redisInfo, getRedisInfo);
  }, []);
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
          {EnvConfig.demo && (
            <Tooltip title="Github repository">
              <IconButton
                href={LinksConfig.githubRepo}
                target="_blank"
                component="a"
                color="inherit"
              >
                <GitHubIcon />
              </IconButton>
            </Tooltip>
          )}
          <Tooltip title="Redis info">
            <IconButton
              onMouseEnter={onRedisHover}
              onClick={openRedisInfo}
              aria-label="redis info"
            >
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
});
