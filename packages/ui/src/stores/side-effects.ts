import { useRunPaginationSideEffects } from './pagination';
import { useRunRefetchJobsLockSideEffects } from './refetch-jobs-lock';

export const useRunStoreSideEffects = () => {
  useRunPaginationSideEffects();
  useRunRefetchJobsLockSideEffects();
};
