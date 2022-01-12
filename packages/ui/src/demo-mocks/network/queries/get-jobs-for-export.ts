import type {
  GetJobsForExportQuery,
  GetJobsForExportQueryVariables,
} from '@/typings/gql';
import { networkMockData } from '../data';

export const getJobsForExportMock = (
  args: GetJobsForExportQueryVariables
): Promise<GetJobsForExportQuery> => {
  return Promise.resolve({
    jobs: networkMockData.jobs.filter(
      (job) =>
        job.queue === args.queue &&
        (args.ids ? args.ids?.includes(job.id) : true)
    ),
  });
};
