import createStore from 'zustand';
import { persist } from 'zustand/middleware';
import { StorageConfig } from '@/config/storage';

type TState = {
  confirmDangerousActions: boolean;
  groupQueuesByPrefix: boolean;
  showStatusesPieInDrawer: boolean;

  changeConfirmDangerousActions: (value: boolean) => void;
  changeShowStatusesPieInDrawer: (value: boolean) => void;
  toggleShowStatusesPieInDrawer: () => void;
  toggleConfirmDangerousActions: () => void;
  toggleGroupQueuesByPrefix: () => void;
};
export const usePreferencesStore = createStore<TState>(
  persist(
    (set) => ({
      showStatusesPieInDrawer: true,
      confirmDangerousActions: true,
      groupQueuesByPrefix: false,

      changeShowStatusesPieInDrawer: (showStatusesPieInDrawer) =>
        set({ showStatusesPieInDrawer }),
      changeConfirmDangerousActions: (confirmDangerousActions) =>
        set({ confirmDangerousActions }),
      toggleConfirmDangerousActions: () =>
        set((state) => ({
          confirmDangerousActions: !state.confirmDangerousActions,
        })),
      toggleShowStatusesPieInDrawer: () =>
        set((state) => ({
          showStatusesPieInDrawer: !state.showStatusesPieInDrawer,
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
