import createStore from 'zustand';
import { persist } from 'zustand/middleware';
import { PaginationConfig } from '@/config/pagination';
import { StorageConfig } from '@/config/storage';

type TState = {
  perPage: number;
  changePerPage: (perPage: number) => void;
};

export const usePaginationStore = createStore<TState>(
  persist(
    (set) => ({
      perPage: PaginationConfig.perPageOptions[1],
      changePerPage: (perPage) => set({ perPage }),
    }),
    {
      whitelist: ['perPage'],
      name: `${StorageConfig.persistNs}pagination`,
    }
  )
);
