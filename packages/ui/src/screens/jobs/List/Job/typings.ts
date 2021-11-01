import type { GetJobsQuery } from '@/typings/gql';

export type TJobProps = {
  job: GetJobsQuery['jobs'][0];
  readonly?: boolean;
  queue: string;
  isSelected: boolean;
  toggleSelected: (id: string) => void;
  removeSelected: (id: string) => void;
};
