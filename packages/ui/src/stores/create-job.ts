import type { Maybe } from '@/typings/utils';
import createStore from 'zustand';
import omit from 'lodash/omit';
import isObject from 'lodash/isObject';
import { JsonService } from '@/services/json';

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
  setInputAndOpen(input: {
    name?: Maybe<string>;
    data?: Maybe<string>;
    options?: Maybe<string>;
  }): void;
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
  setInputAndOpen: (input) => {
    const parsedOptions = JsonService.maybeParse(input.options);
    const finalOptions =
      parsedOptions && isObject(parsedOptions)
        ? JsonService.maybeStringify(omit(parsedOptions, 'timestamp', 2))
        : '';
    set({
      name: input.name || '',
      data: input.data || '',
      options: finalOptions,
      isOpen: true,
    });
  },
  changeData: (data) => set({ data }),
  changeOptions: (options) => set({ options }),
  changeName: (name) => set({ name }),
}));
