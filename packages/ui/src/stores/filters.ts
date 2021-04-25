import createStore from 'zustand';
import { JobStatus, OrderEnum } from '../typings/gql';

type TState = {
  statuses: JobStatus[];
  jobId: string;
  order: OrderEnum;

  changeOrder: (order: OrderEnum) => void;
  toggleStatus: (status: JobStatus) => void;
  replaceStatus: (status: JobStatus) => void;
  changeJobId: (id: string) => void;
  resetJobId: () => void;
};

export const useFiltersStore = createStore<TState>((set) => ({
  statuses: [],
  jobId: '',
  order: OrderEnum.Desc,

  changeOrder: (order) => set({ order }),
  changeJobId: (jobId) => set({ jobId }),
  resetJobId: () => set({ jobId: '' }),
  toggleStatus: (status) =>
    set(({ statuses }) => ({
      statuses: statuses.includes(status)
        ? statuses.filter((s) => s !== status)
        : [...statuses, status],
    })),
  replaceStatus: (status) => set({ statuses: [status] }),
}));
