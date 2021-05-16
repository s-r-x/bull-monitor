import { useRunPaginationSideEffects } from './pagination';
import { useRunRefetchJobsLockSideEffects } from './refetch-jobs-lock';
import { useRunSelectedJobsSideEffects } from './selected-jobs';

export const useRunStoreSideEffects = () => {
  useRunPaginationSideEffects();
  useRunRefetchJobsLockSideEffects();
  useRunSelectedJobsSideEffects();
};
