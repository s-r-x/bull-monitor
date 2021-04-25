import createStore from 'zustand';
import { persist } from 'zustand/middleware';
import { StorageConfig } from '@/config/storage';

type TState = {
  expandRows: boolean;
  changeExpandRows: (expandRows: boolean) => void;
  toggleExpandRows: () => void;
};
export const usePreferencesStore = createStore<TState>(
  persist(
    (set) => ({
      expandRows: false,

      changeExpandRows: (expandRows) => set({ expandRows }),
      toggleExpandRows: () =>
        set((state) => ({ expandRows: !state.expandRows })),
    }),
    {
      name: `${StorageConfig.persistNs}prefs`,
    },
  ),
);
