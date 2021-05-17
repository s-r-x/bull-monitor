import React from 'react';
import BaseDrawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useDrawerState } from '@/stores/drawer';
import { useActiveQueueStore } from '@/stores/active-queue';
import shallow from 'zustand/shallow';
import NetworkRequest from '@/components/NetworkRequest';
import { LayoutConfig } from '@/config/layouts';
import { useFilteredQueues } from './hooks';
import QueuesList from './Queues';
import QueuesFilter from './Filter';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useQueuesQuery } from '@/hooks/use-queues-query';

const useStyles = makeStyles((theme) => ({
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
  filter: {
    marginTop: theme.spacing(1),
    marginLeft: theme.spacing(0.5),
    marginRight: theme.spacing(0.5),
  },
}));

export default function Drawer() {
  const [activeQueue, changeActiveQueue] = useActiveQueueStore(
    (state) => [state.active, state.changeActive],
    shallow,
  );
  const { data, status, refetch } = useQueuesQuery();
  //{
  //  onSuccess(data) {
  //    if (!activeQueue) {
  //      const firstQueue = data?.queues?.[0];
  //      if (firstQueue) {
  //        changeActiveQueue(firstQueue.name);
  //      }
  //    }
  //  },
  //  refetchInterval,
  //},
  const cls = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [isOpen, closeDrawer] = useDrawerState(
    (state) => [state.isOpen, state.close],
    shallow,
  );
  const queues = useFilteredQueues(data?.queues);

  return (
    <nav className={cls.drawer}>
      <BaseDrawer
        open={isDesktop || isOpen}
        container={isDesktop ? undefined : window.document.body}
        variant={isDesktop ? 'permanent' : 'temporary'}
        onClose={closeDrawer}
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        classes={{
          paper: cls.drawerPaper,
        }}
      >
        <div className={cls.toolbar}>
          <IconButton onClick={closeDrawer}>
            {theme.direction === 'ltr' ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </div>
        <NetworkRequest status={status} refetch={refetch}>
          <QueuesFilter className={cls.filter} />
          <QueuesList queues={queues} />
        </NetworkRequest>
      </BaseDrawer>
    </nav>
  );
}
