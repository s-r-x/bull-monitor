import createStore from 'zustand';

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
