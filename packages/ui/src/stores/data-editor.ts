import type { Maybe } from '@/typings/gql';
import createStore from 'zustand';
import type { TJobIdentity } from '@/typings';

type TDataEditorState = {
  isOpen: boolean;
  close: () => void;
  open: (jobIdentity: TJobIdentity) => void;
  jobIdentity: Maybe<TJobIdentity>;
};
export const useDataEditorStore = createStore<TDataEditorState>((set) => ({
  jobIdentity: null,
  isOpen: false,
  open: (jobIdentity) => set({ isOpen: true, jobIdentity }),
  close: () => set({ isOpen: false }),
}));
