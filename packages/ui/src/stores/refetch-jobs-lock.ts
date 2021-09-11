import { useEffect } from 'react';
import createStore from 'zustand';
import shallow from 'zustand/shallow';
import { useDataEditorStore } from './data-editor';
import { useJobLogsStore } from './job-logs';

type TState = {
  isLocked: boolean;

  unlock: () => void;
  lock: () => void;
  toggle: () => void;
};

export const useRefetchJobsLockStore = createStore<TState>((set) => ({
  isLocked: false,

  unlock: () => set({ isLocked: false }),
  lock: () => set({ isLocked: true }),
  toggle: () => set((state) => ({ isLocked: !state.isLocked })),
}));
export const useRunRefetchJobsLockSideEffects = () => {
  const [lock, unlock] = useRefetchJobsLockStore(
    (state) => [state.lock, state.unlock],
    shallow
  );
  useEffect(() => {
    const modalEffect = (isOpen: boolean) => {
      if (isOpen) {
        lock();
      } else {
        unlock();
      }
    };
    const unsubDataEditor = useDataEditorStore.subscribe(
      modalEffect,
      (state) => state.isOpen
    );
    const unsubJobLogs = useJobLogsStore.subscribe(
      modalEffect,
      (state) => state.isOpen
    );
    return () => {
      unsubDataEditor();
      unsubJobLogs();
    };
  }, []);
};
