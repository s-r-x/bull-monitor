import type { RetryJobsMutation } from '@/typings/gql';

export const retryJobsMock = (): Promise<RetryJobsMutation> => {
  return Promise.resolve({
    retryJobs: [],
  });
};
