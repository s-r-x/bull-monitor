import React from 'react';
import BaseDrawer from '@material-ui/core/Drawer';
import Hidden from '@material-ui/core/Hidden';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme, Theme } from '@material-ui/core/styles';
import { useDrawerState } from '@/stores/drawer';
import { useActiveQueueStore } from '@/stores/active-queue';
import shallow from 'zustand/shallow';
import { useQuery } from 'react-query';
import Badge from '@material-ui/core/Badge';
import { useNetwork } from '@/hooks/use-network';
import { QueryKeysConfig } from '@/config/query-keys';
import NetworkRequest from '@/components/NetworkRequest';
import { LayoutConfig } from '@/config/layouts';
import { getPollingInterval } from '@/stores/network-settings';

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    [theme.breakpoints.up('md')]: {
      width: LayoutConfig.drawerWidth,
      flexShrink: 0,
    },
  },
  toolbar: {
    ...theme.mixins.toolbar,
    display: 'flex',
    alignItems: 'center',
  },
  drawerPaper: {
    width: LayoutConfig.drawerWidth,
  },
}));

export default function Drawer() {
  const {
    queries: { getQueuesForDrawer },
  } = useNetwork();
  const [activeQueue, changeActiveQueue] = useActiveQueueStore(
    (state) => [state.active, state.changeActive],
    shallow,
  );
  const refetchInterval = getPollingInterval();
  const { data, status, refetch } = useQuery(
    QueryKeysConfig.drawerQueues,
    getQueuesForDrawer,
    {
      onSuccess(data) {
        if (!activeQueue) {
          const firstQueue = data?.queues?.[0];
          if (firstQueue) {
            changeActiveQueue(firstQueue.name);
          }
        }
      },
      refetchInterval,
    },
  );
  const classes = useStyles();
  const theme = useTheme();
  const [isOpen, toggle] = useDrawerState(
    (state) => [state.isOpen, state.toggle],
    shallow,
  );
  const drawer = (
    <>
      <div className={classes.toolbar}>
        <IconButton onClick={toggle}>
          {theme.direction === 'ltr' ? (
            <ChevronLeftIcon />
          ) : (
            <ChevronRightIcon />
          )}
        </IconButton>
      </div>
      <NetworkRequest status={status} refetch={refetch}>
        <List>
          {data?.queues?.map((queue: any) => (
            <ListItem
              onClick={() => {
                changeActiveQueue(queue.name);
                if (isOpen) {
                  toggle();
                }
              }}
              selected={queue.name === activeQueue}
              key={queue.name}
              button
            >
              <ListItemIcon>
                <Badge
                  badgeContent={queue.waitingOrDelayedJobsCount}
                  color="primary"
                  max={Infinity}
                  showZero
                >
                  <InboxIcon />
                </Badge>
              </ListItemIcon>
              <ListItemText primary={queue.name} />
            </ListItem>
          ))}
        </List>
      </NetworkRequest>
    </>
  );

  return (
    <nav className={classes.drawer}>
      <Hidden mdUp implementation="css">
        <BaseDrawer
          container={window.document.body}
          variant="temporary"
          anchor={theme.direction === 'rtl' ? 'right' : 'left'}
          open={isOpen}
          onClose={toggle}
          classes={{
            paper: classes.drawerPaper,
          }}
          ModalProps={{
            keepMounted: false,
          }}
        >
          {drawer}
        </BaseDrawer>
      </Hidden>
      <Hidden smDown implementation="css">
        <BaseDrawer
          classes={{
            paper: classes.drawerPaper,
          }}
          variant="permanent"
          open
        >
          {drawer}
        </BaseDrawer>
      </Hidden>
    </nav>
  );
}
