import type { GetJobsQuery } from '@/typings/gql';

export type TJobProps = {
  job: GetJobsQuery['jobs'][0];
  queue: string;
  isSelected: boolean;
  toggleSelected: (id: string) => void;
};
