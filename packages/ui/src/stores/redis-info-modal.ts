import createStore from 'zustand';

type TState = {
  isOpen: boolean;
  close: () => void;
  open: () => void;
};
export const useRedisInfoModalStore = createStore<TState>((set) => ({
  isOpen: false,

  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
