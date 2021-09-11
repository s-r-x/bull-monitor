import createStore from 'zustand';
import { persist } from 'zustand/middleware';
import { StorageConfig } from '@/config/storage';
import { JobStatus } from '@/typings/gql';
import type { Maybe } from '@/typings/utils';

type TSortField = Maybe<`${Exclude<JobStatus, 'stuck'>}`>;
export const AVAILABLE_SORT_FIELDS = [
  null,
  ...Object.values(JobStatus).filter((v) => v !== 'stuck'),
] as TSortField[];
type TState = {
  field: TSortField;
  changeField: (field: TSortField) => void;
};

export const useQueuesSortStore = createStore<TState>(
  persist(
    (set) => ({
      field: null,
      changeField: (field) => set({ field }),
    }),
    {
      name: `${StorageConfig.persistNs}queues-sort`,
    }
  )
);
