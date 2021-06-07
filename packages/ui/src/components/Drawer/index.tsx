import React from 'react';
import BaseDrawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useDrawerState } from '@/stores/drawer';
import shallow from 'zustand/shallow';
import NetworkRequest from '@/components/NetworkRequest';
import { LayoutConfig } from '@/config/layouts';
import {
  useDrawerWidth,
  useFilteredQueues,
  useSetActiveQueueOnFirstLoad,
} from './hooks';
import QueuesList from './Queues';
import QueuesFilter from './Filter';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useQueuesQuery } from '@/hooks/use-queues-query';
import Footer from './Footer';

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
  footer: {
    marginTop: 'auto',
    position: 'sticky',
    bottom: 0,
    zIndex: 2,
  },
  dragger: {
    width: 4,
    cursor: 'ew-resize',
    padding: '4px 0 0',
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    zIndex: 100,
  },
}));

export default function Drawer() {
  const { data, status, refetch } = useQueuesQuery();
  const cls = useStyles();
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [isOpen, closeDrawer] = useDrawerState(
    (state) => [state.isOpen, state.close],
    shallow,
  );
  const queues = data?.queues;
  useSetActiveQueueOnFirstLoad(queues);
  const filteredQueues = useFilteredQueues(queues);
  const { drawerWidth, draggerRef } = useDrawerWidth();

  return (
    <nav className={cls.drawer} style={{ width: drawerWidth }}>
      <BaseDrawer
        open={isDesktop || isOpen}
        container={isDesktop ? undefined : window.document.body}
        variant={isDesktop ? 'permanent' : 'temporary'}
        onClose={closeDrawer}
        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
        classes={{
          paper: cls.drawerPaper,
        }}
        PaperProps={{ style: { width: drawerWidth } }}
      >
        <div id="dragger" ref={draggerRef} className={cls.dragger} />
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
          <QueuesList queues={filteredQueues} />
        </NetworkRequest>
        {queues && <Footer queues={queues} className={cls.footer} />}
      </BaseDrawer>
    </nav>
  );
}
