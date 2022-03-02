import { JobStatus } from '@/typings/gql';
import range from 'lodash/range';
import sample from 'lodash/sample';
import random from 'lodash/random';
import { EnvConfig } from '@/config/env';
import without from 'lodash/without';
import { v4 as uuidv4 } from 'uuid';

const QUEUES_AMOUNT = 10;
const JOBS_AMOUNT = 100;

const jobStatuses = without(
  Object.values(JobStatus),
  JobStatus.Stuck
) as JobStatus[];

const generateData = () => {
  const queues = range(QUEUES_AMOUNT).map((n) => ({
    id: uuidv4(),
    name: `queue:${n}`,
    isPaused: false,
    keyPrefix: 'bull',
  }));
  const jobs = range(JOBS_AMOUNT).map((n) => {
    const status = sample(jobStatuses) as JobStatus;
    const delay = status === JobStatus.Delayed ? 100000 : 0;
    const timestamp = new Date().getTime();
    const isFailedOrCompleted =
      status === JobStatus.Completed || status === JobStatus.Failed;
    const isFailedOrCompletedOrActive =
      isFailedOrCompleted || status === JobStatus.Active;
    return {
      id: String(random(0, 1000000)),
      queue: sample(queues)?.id,
      status,
      progress: '0',
      attemptsMade: 0,
      returnValue: status === JobStatus.Completed ? 'some return value' : null,
      failedReason: status === JobStatus.Failed ? 'some failed reason' : null,
      processedOn: isFailedOrCompletedOrActive ? timestamp : null,
      finishedOn: isFailedOrCompleted ? timestamp : null,
      delay,
      timestamp,
      name: '__default__',
      opts: JSON.stringify(
        {
          timestamp,
          delay,
        },
        null,
        2
      ),
      stacktrace: [],
      data: `{"key": "value-${n}"}`,
      logs: {
        count: 0,
        logs: ['some log'] as string[],
      },
    };
  });
  return { jobs, queues };
};

type TReturnValue = ReturnType<typeof generateData>;
class NetworkMockData {
  public queues: TReturnValue['queues'] = [];
  public jobs: TReturnValue['jobs'] = [];
  constructor() {
    if (EnvConfig.useMocks) {
      const { queues, jobs } = generateData();
      this.queues = queues;
      this.jobs = jobs;
    }
  }
  public findJob(queue: string, id: string) {
    return this.jobs.find((job) => job.id == id && job.queue === queue);
  }
  public findQueue(queue: string) {
    return this.queues.find(({ id }) => queue === id);
  }
}

export const networkMockData = new NetworkMockData();
