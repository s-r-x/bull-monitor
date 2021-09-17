import createStore from 'zustand';
import { persist } from 'zustand/middleware';
import { StorageConfig } from '@/config/storage';

type TState = {
  confirmDangerousActions: boolean;
  groupQueuesByPrefix: boolean;

  changeConfirmDangerousActions: (value: boolean) => void;
  toggleConfirmDangerousActions: () => void;
  toggleGroupQueuesByPrefix: () => void;
};
export const usePreferencesStore = createStore<TState>(
  persist(
    (set) => ({
      confirmDangerousActions: true,
      groupQueuesByPrefix: false,

      changeConfirmDangerousActions: (confirmDangerousActions) =>
        set({ confirmDangerousActions }),
      toggleConfirmDangerousActions: () =>
        set((state) => ({
          confirmDangerousActions: !state.confirmDangerousActions,
        })),
      toggleGroupQueuesByPrefix: () =>
        set((state) => ({
          groupQueuesByPrefix: !state.groupQueuesByPrefix,
        })),
    }),
    {
      name: `${StorageConfig.persistNs}prefs`,
      version: 2,
    }
  )
);
