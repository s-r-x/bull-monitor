import { useEffect } from 'react';
import createStore from 'zustand';
import { useActiveQueueStore } from './active-queue';
import { useFiltersStore } from './filters';
import shallow from 'zustand/shallow';
import { usePaginationStore } from './pagination';

type TState = {
  selected: Set<string>;
  addJob: (id: string) => void;
  toggleJob: (id: string) => void;
  setJobs: (ids: string[]) => void;
  removeJob: (id: string) => void;
  clear: () => void;
};
export const useSelectedJobsStore = createStore<TState>((set, get) => ({
  selected: new Set(),
  setJobs: (ids) =>
    set({
      selected: new Set(ids),
    }),
  addJob: (id) =>
    set({
      selected: new Set(get().selected).add(id),
    }),
  toggleJob: (id) => {
    const { selected } = get();
    if (selected.has(id)) {
      selected.delete(id);
      set({ selected: new Set(selected) });
    } else {
      set({
        selected: new Set(selected).add(id),
      });
    }
  },
  removeJob: (id) => {
    const selected = new Set(get().selected);
    selected.delete(id);
    set({ selected });
  },
  clear: () => {
    const { selected } = get();
    if (selected.size > 0) {
      set({
        selected: new Set(),
      });
    }
  },
}));

export const useRunSelectedJobsSideEffects = () => {
  const clear = useSelectedJobsStore((state) => state.clear);
  useEffect(() => {
    const effect = clear;
    const unsubActiveQueue = useActiveQueueStore.subscribe(
      effect,
      (state) => state.active,
    );
    const unsubFilters = useFiltersStore.subscribe(
      effect,
      (state) => [state.order, state.status, state.jobId],
      shallow,
    );
    const unsubPagination = usePaginationStore.subscribe(
      effect,
      (state) => state.page,
    );
    return () => {
      unsubActiveQueue();
      unsubFilters();
      unsubPagination();
    };
  }, []);
};
