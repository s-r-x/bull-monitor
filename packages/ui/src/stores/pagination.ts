import createStore from 'zustand';
import { useActiveQueueStore } from './active-queue';
import shallow from 'zustand/shallow';
import { useEffect } from 'react';
import { persist } from 'zustand/middleware';
import { useFiltersStore } from './filters';
import { PaginationConfig } from '@/config/pagination';
import { StorageConfig } from '@/config/storage';

type TState = {
  perPage: number;
  page: number;
  changePerPage: (perPage: number) => void;
  changePage: (page: number) => void;
};

export const usePaginationStore = createStore<TState>(
  persist(
    (set) => ({
      page: 0,
      perPage: PaginationConfig.perPageOptions[1],

      changePage: (page) => set({ page }),
      changePerPage: (perPage) => set({ perPage }),
    }),
    {
      whitelist: ['perPage'],
      name: `${StorageConfig.persistNs}pagination`,
    },
  ),
);

export const useRunPaginationSideEffects = () => {
  const changePage = usePaginationStore((state) => state.changePage);
  useEffect(() => {
    const effect = () => changePage(0);
    const unsubFilters = useFiltersStore.subscribe(
      effect,
      (state) => [
        state.order,
        state.status,
        state.jobId,
        state.dataSearchKey,
        state.dataSearchTerm,
      ],
      shallow,
    );
    const unsubActiveQueue = useActiveQueueStore.subscribe(
      effect,
      (state) => state.active,
    );
    return () => {
      unsubActiveQueue();
      unsubFilters();
    };
  }, []);
};
