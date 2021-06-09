import createStore from 'zustand';
import { persist } from 'zustand/middleware';
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
