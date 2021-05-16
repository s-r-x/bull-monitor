import type {
  RetryJobsMutation,
  RetryJobsMutationVariables,
} from '@/typings/gql';

export const retryJobsMock = (
  _args: RetryJobsMutationVariables,
): Promise<RetryJobsMutation> => {
  return Promise.resolve({
    retryJobs: [],
  });
};
