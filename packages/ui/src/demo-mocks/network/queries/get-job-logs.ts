import type { GetJobLogsQuery, GetJobLogsQueryVariables } from '@/typings/gql';
import { networkMockData } from '../data';

export const getJobLogsMock = (
  args: GetJobLogsQueryVariables
): Promise<GetJobLogsQuery> =>
  Promise.resolve({
    job: networkMockData.jobs.find(
      (job) => job.queue === args.queue && job.id === args.id
    ),
  });
