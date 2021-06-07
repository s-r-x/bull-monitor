import { useEffect, useMemo, useState } from 'react';
import { useQueuesFilterStore } from '@/stores/queues-filter';
import type { GetQueuesQuery } from '@/typings/gql';
import { useActiveQueueStore } from '@/stores/active-queue';
import shallow from 'zustand/shallow';
import { LayoutConfig } from '@/config/layouts';

type TQueues = GetQueuesQuery['queues'];
export const useFilteredQueues = (queues?: TQueues) => {
  const filterName = useQueuesFilterStore((state) => state.name);
  return useMemo(() => {
    if (!queues || !filterName) {
      return queues;
    }
    const lowerFilter = filterName.toLowerCase();
    return queues.filter(({ name }) =>
      name.toLowerCase().includes(lowerFilter),
    );
  }, [filterName, queues]);
};
export const useSetActiveQueueOnFirstLoad = (queues?: TQueues) => {
  const [activeQueue, changeActiveQueue] = useActiveQueueStore(
    (state) => [state.active, state.changeActive],
    shallow,
  );
  useEffect(() => {
    if (!activeQueue && queues) {
      const firstQueue = queues[0];
      if (firstQueue) {
        changeActiveQueue(firstQueue.name);
      }
    }
  }, [queues, activeQueue]);
};

export const useDrawerWidth = () => {
  const [isResizing, setIsResizing] = useState(false);
  const [drawerWidth, setDrawerWidth] = useState(LayoutConfig.drawerWidth);

  const handleMousedown = () => setIsResizing(true);
  const handleMouseup = () => setIsResizing(false);

  const handleMousemove = (e: MouseEvent) => {
    if (!isResizing) return;

    if (
      e.clientX > LayoutConfig.drawerWidth &&
      e.clientX < LayoutConfig.drawerWidth * 2
    ) {
      setDrawerWidth(e.clientX);
    }
  };

  useEffect(() => {
    document.addEventListener('mousemove', handleMousemove);
    document.addEventListener('mouseup', handleMouseup);

    return () => {
      document.removeEventListener('mousemove', handleMousemove);
      document.removeEventListener('mouseup', handleMouseup);
    };
  }, [isResizing]);
  return {
    drawerWidth,
    handleMousedown,
  };
};
