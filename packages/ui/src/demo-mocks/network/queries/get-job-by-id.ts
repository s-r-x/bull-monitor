import type { GetJobByIdQuery, GetJobByIdQueryVariables } from '@/typings/gql';
import { networkMockData } from '../data';

export const getJobByIdMock = (
  args: GetJobByIdQueryVariables
): Promise<GetJobByIdQuery> => {
  const job = networkMockData.jobs.find(
    (job) => job.queue === args.queue && job.id === args.id
  );
  return Promise.resolve({ job });
};
