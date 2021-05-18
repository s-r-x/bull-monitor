import createStore from 'zustand';
import { persist } from 'zustand/middleware';
import { StorageConfig } from '@/config/storage';

type TState = {
  confirmDangerousActions: boolean;

  changeConfirmDangerousActions: (value: boolean) => void;
  toggleConfirmDangerousActions: () => void;
};
export const usePreferencesStore = createStore<TState>(
  persist(
    (set) => ({
      confirmDangerousActions: true,

      changeConfirmDangerousActions: (confirmDangerousActions) =>
        set({ confirmDangerousActions }),
      toggleConfirmDangerousActions: () =>
        set((state) => ({
          confirmDangerousActions: !state.confirmDangerousActions,
        })),
    }),
    {
      name: `${StorageConfig.persistNs}prefs`,
    },
  ),
);
