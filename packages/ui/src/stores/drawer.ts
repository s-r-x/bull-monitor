import { LayoutConfig } from '@/config/layouts';
import { StorageConfig } from '@/config/storage';
import createStore from 'zustand';
import { persist } from 'zustand/middleware';

type TState = {
  isOpen: boolean;
  defaultWidth: number;

  changeDefaultWidth: (defaultWidth: number) => void;
  toggle: () => void;
  open: () => void;
  close: () => void;
};

export const useDrawerState = createStore<TState>(
  persist(
    (set) => ({
      isOpen: false,
      defaultWidth: LayoutConfig.drawerWidth,

      changeDefaultWidth: (defaultWidth) => set({ defaultWidth }),
      toggle: () => set(({ isOpen }) => ({ isOpen: !isOpen })),
      close: () => set({ isOpen: false }),
      open: () => set({ isOpen: true }),
    }),
    {
      name: `${StorageConfig.persistNs}drawer`,
    }
  )
);
