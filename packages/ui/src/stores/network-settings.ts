import createStore from 'zustand';
import { persist } from 'zustand/middleware';
import { StorageConfig } from '@/config/storage';

type TPollingOption = number;
type TState = {
  pollingInterval: TPollingOption;

  changePollingInterval: (pollingInterval: TPollingOption) => void;
};
export const useNetworkSettingsStore = createStore<TState>(
  persist(
    (set) => ({
      pollingInterval: 5000,
      changePollingInterval: (pollingInterval) => set({ pollingInterval }),
    }),
    {
      name: `${StorageConfig.persistNs}network`,
    },
  ),
);
export const getPollingInterval = () => {
  const interval = useNetworkSettingsStore((state) => state.pollingInterval);
  return interval ? interval : false;
};
