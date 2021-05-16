import createStore from 'zustand';

type TState = {
  isOpen: boolean;

  toggle: () => void;
  open: () => void;
  close: () => void;
};

export const useDrawerState = createStore<TState>((set) => ({
  isOpen: false,

  toggle: () => set(({ isOpen }) => ({ isOpen: !isOpen })),
  close: () => set({ isOpen: false }),
  open: () => set({ isOpen: true }),
}));
