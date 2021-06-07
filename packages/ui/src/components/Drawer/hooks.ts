import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useQueuesFilterStore } from '@/stores/queues-filter';
import type { GetQueuesQuery } from '@/typings/gql';
import { useActiveQueueStore } from '@/stores/active-queue';
import shallow from 'zustand/shallow';
import { LayoutConfig } from '@/config/layouts';
import type { Maybe } from '@/typings/utils';
import { useDrawerState } from '@/stores/drawer';
import debounce from 'lodash/debounce';

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

const useWaitForDraggerToMount = (
  ref: React.MutableRefObject<Maybe<HTMLDivElement>>,
) => {
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => {
    if (!ref.current) {
      const interval = setInterval(() => {
        if (ref.current) {
          setIsMounted(true);
          clearInterval(interval);
        }
      }, 100);
      return () => clearInterval(interval);
    }
  }, []);
  return isMounted;
};
export const useDrawerWidth = () => {
  const [
    defaultDrawerWidth,
    changeDefaultDrawerWidth,
  ] = useDrawerState((state) => [state.defaultWidth, state.changeDefaultWidth]);
  const draggerRef = useRef<HTMLDivElement>(null);
  const [drawerWidth, setDrawerWidth] = useState(defaultDrawerWidth);
  const isDraggerMounted = useWaitForDraggerToMount(draggerRef);

  useEffect(() => {
    if (isDraggerMounted) {
      const $dragger = draggerRef.current as HTMLDivElement;
      const $body = document.body;
      const changeDefaultDrawerWidthDebounced = debounce((newWidth: number) => {
        changeDefaultDrawerWidth(newWidth);
      }, 500);
      const handleMousemove = (e: MouseEvent) => {
        if (
          e.clientX > LayoutConfig.drawerWidth &&
          e.clientX < LayoutConfig.maxDrawerWidth
        ) {
          setDrawerWidth(e.clientX);
          changeDefaultDrawerWidthDebounced(e.clientX);
        }
      };
      const handleMousedown = () => {
        $body.style.cursor = 'ew-resize';
        $body.style.userSelect = 'none';
        document.addEventListener('mousemove', handleMousemove);
        document.addEventListener('mouseup', handleMouseup);
      };
      const handleMouseup = () => {
        $body.style.cursor = 'default';
        $body.style.userSelect = 'auto';
        document.removeEventListener('mousemove', handleMousemove);
        document.removeEventListener('mouseup', handleMouseup);
      };

      $dragger.addEventListener('mousedown', handleMousedown);

      return () => {
        document.removeEventListener('mousemove', handleMousemove);
        document.removeEventListener('mouseup', handleMouseup);
        $dragger.removeEventListener('mousedown', handleMousedown);
      };
    }
  }, [isDraggerMounted]);
  return {
    drawerWidth,
    draggerRef,
  };
};
