import { StorageConfig } from '@/config/storage';
import createStore from 'zustand';
import { persist } from 'zustand/middleware';

export type TScreen = 'jobs' | 'metrics';

type TState = {
  screen: TScreen;

  changeScreen: (screen: TScreen) => void;
  toggleScreen: () => void;
};

export const useActiveScreenStore = createStore<TState>(
  persist(
    (set, get) => ({
      screen: 'jobs',

      changeScreen: (screen) => set({ screen }),
      toggleScreen: () =>
        set({ screen: get().screen === 'jobs' ? 'metrics' : 'jobs' }),
    }),
    {
      name: `${StorageConfig.persistNs}active-screen`,
    }
  )
);
