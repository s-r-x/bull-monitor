import createStore from 'zustand';
import { JobStatus, OrderEnum } from '../typings/gql';

type TState = {
  status: JobStatus;
  jobId: string;
  order: OrderEnum;
  dataSearchKey: string;
  dataSearchTerm: string;

  changeOrder: (order: OrderEnum) => void;
  changeDataSearchKey: (key: string) => void;
  changeDataSearchTerm: (term: string) => void;
  changeStatus: (status: JobStatus) => void;
  changeJobId: (id: string) => void;
  resetJobId: () => void;
};

export const useFiltersStore = createStore<TState>((set) => ({
  status: JobStatus.Active,
  jobId: '',
  order: OrderEnum.Desc,
  dataSearchKey: '',
  dataSearchTerm: '',

  changeDataSearchKey: (dataSearchKey) => set({ dataSearchKey }),
  changeDataSearchTerm: (dataSearchTerm) => set({ dataSearchTerm }),
  changeOrder: (order) => set({ order }),
  changeJobId: (jobId) => set({ jobId }),
  resetJobId: () => set({ jobId: '' }),
  changeStatus: (status) => set({ status }),
}));
