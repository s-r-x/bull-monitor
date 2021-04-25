import createStore from 'zustand';

type TState = {
  isOpen: boolean;
  close: () => void;
  open: () => void;
};
export const useSettingsModalStore = createStore<TState>((set) => ({
  isOpen: false,

  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
}));
