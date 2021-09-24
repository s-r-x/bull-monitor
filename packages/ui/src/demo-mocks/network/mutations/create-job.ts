import random from 'lodash/random';
import type {
  CreateJobMutation,
  CreateJobMutationVariables,
} from '@/typings/gql';
import { JobStatus } from '@/typings/gql';
import { networkMockData } from '../data';

export const createJobMock = ({
  input,
}: CreateJobMutationVariables): Promise<CreateJobMutation> => {
  const job = {
    queue: input.queue,
    name: input.name,
    id: String(random(0, 1000000)),
    data: input.data,
    status: JobStatus.Waiting,
    attemptsMade: 0,
    opts: input.options,
    stacktrace: [],
    timestamp: new Date().getTime(),
    logs: {
      count: 0,
      logs: [],
    },
  };
  // @ts-ignore
  networkMockData.jobs.unshift(job);
  return Promise.resolve({ createJob: job });
};
