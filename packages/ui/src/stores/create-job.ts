import createStore from 'zustand';

const DEFAULT_DATA = '{}';
const DEFAULT_OPTIONS = '{}';
const DEFAULT_NAME = '';

type TState = {
  isOpen: boolean;
  name: string;
  data: string;
  options: string;

  close: () => void;
  closeAndClearInput: () => void;
  open: () => void;
  changeData: (data: string) => void;
  changeOptions: (options: string) => void;
  changeName: (name: string) => void;
};
export const useCreateJobStore = createStore<TState>((set) => ({
  data: DEFAULT_DATA,
  options: DEFAULT_OPTIONS,
  name: '',

  isOpen: false,
  open: () => set({ isOpen: true }),
  close: () => set({ isOpen: false }),
  closeAndClearInput: () =>
    set({
      isOpen: false,
      data: DEFAULT_DATA,
      options: DEFAULT_OPTIONS,
      name: DEFAULT_NAME,
    }),
  changeData: (data) => set({ data }),
  changeOptions: (options) => set({ options }),
  changeName: (name) => set({ name }),
}));
