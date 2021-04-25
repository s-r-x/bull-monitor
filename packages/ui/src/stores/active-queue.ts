import createStore from 'zustand';

type TState = {
  active: string | null;
  changeActive: (active: string) => void;
  resetActive: () => void;
};

export const useActiveQueueStore = createStore<TState>((set) => ({
  active: null,

  changeActive: (active) => set({ active }),
  resetActive: () => set({ active: null }),
}));
