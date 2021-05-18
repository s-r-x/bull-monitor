import createStore from 'zustand';
import { persist } from 'zustand/middleware';
import { StorageConfig } from '@/config/storage';

type TQueues = Record<string, boolean>;
type TState = {
  queues: TQueues;

  toggle: (queue: string) => void;
  expandMany: (queues: string[]) => void;
  collapseMany: (queues: string[]) => void;
};

export const useQueuesCollapseStore = createStore<TState>(
  persist(
    (set, get) => ({
      queues: {},
      toggle: (queue) => {
        const { queues } = get();
        set({
          queues: {
            ...queues,
            [queue]: !queues[queue],
          },
        });
      },
      expandMany: (queues) => {
        set({
          queues: {
            ...get().queues,
            ...queues.reduce(
              (acc, queue) => ({
                ...acc,
                [queue]: true,
              }),
              {} as TQueues,
            ),
          },
        });
      },
      collapseMany: (queues) => {
        set({
          queues: {
            ...get().queues,
            ...queues.reduce(
              (acc, queue) => ({
                ...acc,
                [queue]: false,
              }),
              {} as TQueues,
            ),
          },
        });
      },
    }),
    {
      name: `${StorageConfig.persistNs}queues-collapse`,
    },
  ),
);
