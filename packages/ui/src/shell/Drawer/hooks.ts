import { useMemo } from 'react';
import { useQueuesFilterStore } from '@/stores/queues-filter';
import type { GetQueuesQuery } from '@/typings/gql';
import { LayoutConfig } from '@/config/layouts';
import { useDrawerState } from '@/stores/drawer';
import { useQueuesSortStore } from '@/stores/queues-sort';
import orderBy from 'lodash/orderBy';
import clamp from 'lodash/clamp';

type TQueues = GetQueuesQuery['queues'];
export const useFilteredQueues = (queues?: TQueues) => {
  const filterName = useQueuesFilterStore((state) => state.name);
  return useMemo(() => {
    if (!queues || !filterName) {
      return queues;
    }
    const lowerFilter = filterName.toLowerCase();
    return queues.filter(({ name }) =>
      name.toLowerCase().includes(lowerFilter)
    );
  }, [filterName, queues]);
};
export const useSortedQueues = (queues?: TQueues) => {
  const field = useQueuesSortStore((state) => state.field);
  return useMemo(() => {
    if (!queues || !field) return queues;
    return orderBy(queues, 'jobsCounts.' + field, 'desc');
  }, [queues, field]);
};

export const useDraggerEventHandlers = () => {
  const changeDrawerWidth = useDrawerState((state) => state.changeDefaultWidth);
  return useMemo(() => {
    const $body = document.body;
    const onMouseMove = (e: MouseEvent) => {
      const normalizedWidth = clamp(
        e.clientX,
        LayoutConfig.drawerWidth,
        LayoutConfig.maxDrawerWidth
      );
      changeDrawerWidth(normalizedWidth);
    };
    const onMouseDown = () => {
      $body.classList.add('resizing-drawer');
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    };
    const onMouseUp = () => {
      $body.classList.remove('resizing-drawer');
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    return {
      onMouseDown,
    };
  }, []);
};
