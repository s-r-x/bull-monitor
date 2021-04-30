import createStore from 'zustand';
import { JobStatus, OrderEnum } from '../typings/gql';

type TState = {
  status: JobStatus;
  jobId: string;
  order: OrderEnum;

  changeOrder: (order: OrderEnum) => void;
  changeStatus: (status: JobStatus) => void;
  changeJobId: (id: string) => void;
  resetJobId: () => void;
};

export const useFiltersStore = createStore<TState>((set) => ({
  status: JobStatus.Active,
  jobId: '',
  order: OrderEnum.Desc,

  changeOrder: (order) => set({ order }),
  changeJobId: (jobId) => set({ jobId }),
  resetJobId: () => set({ jobId: '' }),
  changeStatus: (status) => set({ status }),
}));
