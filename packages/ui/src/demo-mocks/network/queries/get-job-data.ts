import type { GetJobDataQuery, GetJobDataQueryVariables } from '@/typings/gql';
import { networkMockData } from '../data';

export const getJobDataMock = (
  args: GetJobDataQueryVariables
): Promise<GetJobDataQuery> =>
  Promise.resolve({
    job: networkMockData.jobs.find(
      (job) => job.queue === args.queue && job.id === args.id
    ),
  });
