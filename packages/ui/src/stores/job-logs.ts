import type { Maybe } from '@/typings/gql';
import createStore from 'zustand';
import type { TJobIdentity } from '@/typings';

type TJobLogsState = {
  isOpen: boolean;
  close: () => void;
  open: (jobIdentity: TJobIdentity) => void;
  jobIdentity: Maybe<TJobIdentity>;
};
export const useJobLogsStore = createStore<TJobLogsState>((set) => ({
  jobIdentity: null,
  isOpen: false,
  open: (jobIdentity) => set({ isOpen: true, jobIdentity }),
  close: () => set({ isOpen: false }),
}));
