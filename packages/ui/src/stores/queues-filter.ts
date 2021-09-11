import createStore from 'zustand';
import { persist } from 'zustand/middleware';
import { StorageConfig } from '@/config/storage';

type TState = {
  name: string;
  changeName: (name: string) => void;
};

export const useQueuesFilterStore = createStore<TState>(
  persist(
    (set) => ({
      name: '',
      changeName: (name) => set({ name }),
    }),
    {
      name: `${StorageConfig.persistNs}queues-filter`,
    }
  )
);
