import { useRunRefetchJobsLockSideEffects } from './refetch-jobs-lock';

export const useRunStoreSideEffects = () => {
  useRunRefetchJobsLockSideEffects();
};
