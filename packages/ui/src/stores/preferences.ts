import createStore from 'zustand';
import { persist } from 'zustand/middleware';
import { StorageConfig } from '@/config/storage';

type TState = {
  expandRows: boolean;
  confirmDangerousActions: boolean;

  changeExpandRows: (expandRows: boolean) => void;
  changeConfirmDangerousActions: (value: boolean) => void;
  toggleExpandRows: () => void;
  toggleConfirmDangerousActions: () => void;
};
export const usePreferencesStore = createStore<TState>(
  persist(
    (set) => ({
      confirmDangerousActions: true,
      expandRows: false,

      changeConfirmDangerousActions: (confirmDangerousActions) =>
        set({ confirmDangerousActions }),
      changeExpandRows: (expandRows) => set({ expandRows }),
      toggleExpandRows: () =>
        set((state) => ({ expandRows: !state.expandRows })),
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
