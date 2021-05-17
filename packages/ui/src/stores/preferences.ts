import createStore from 'zustand';
import { persist } from 'zustand/middleware';
import { StorageConfig } from '@/config/storage';

type TState = {
  confirmDangerousActions: boolean;
  expandJobsCount: boolean;

  changeExpandJobsCount: (value: boolean) => void;
  toggleExpandJobsCount: () => void;
  changeConfirmDangerousActions: (value: boolean) => void;
  toggleConfirmDangerousActions: () => void;
};
export const usePreferencesStore = createStore<TState>(
  persist(
    (set) => ({
      confirmDangerousActions: true,
      expandJobsCount: false,

      changeExpandJobsCount: (expandJobsCount) => set({ expandJobsCount }),
      changeConfirmDangerousActions: (confirmDangerousActions) =>
        set({ confirmDangerousActions }),
      toggleConfirmDangerousActions: () =>
        set((state) => ({
          confirmDangerousActions: !state.confirmDangerousActions,
        })),
      toggleExpandJobsCount: () =>
        set((state) => ({
          expandJobsCount: !state.expandJobsCount,
        })),
    }),
    {
      name: `${StorageConfig.persistNs}prefs`,
    },
  ),
);
