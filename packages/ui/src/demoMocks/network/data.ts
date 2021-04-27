import { JobStatus } from '@/typings/gql';
import range from 'lodash/range';
import sample from 'lodash/sample';
import random from 'lodash/random';

const QUEUES_AMOUNT = 10;
const JOBS_AMOUNT = 100;

const queues = range(QUEUES_AMOUNT).map((n) => ({
  name: `queue:${n}`,
  isPaused: false,
}));
const jobs = range(JOBS_AMOUNT).map((n) => {
  const status = sample(Object.values(JobStatus)) as JobStatus;
  const delay = status === JobStatus.Delayed ? 100000 : 0;
  const timestamp = new Date().getTime();
  return {
    id: String(random(0, 1000000)),
    queue: sample(queues)?.name,
    status,
    progress: 0,
    attemptsMade: 0,
    returnValue: status === JobStatus.Completed ? 'some return value' : null,
    failedReason: status === JobStatus.Failed ? 'some failed reason' : null,
    delay,
    timestamp,
    name: '__default__',
    opts: JSON.stringify(
      {
        timestamp,
        delay,
      },
      null,
      2,
    ),
    stacktrace: [],
    data: `{"key": "value-${n}"}`,
    logs: {
      count: 0,
      logs: [] as string[],
    },
  };
});

class NetworkMockData {
  public queues: typeof queues;
  public jobs: typeof jobs;
  constructor() {
    this.queues = queues;
    this.jobs = jobs;
  }
  public findJob(queue: string, id: string) {
    return this.jobs.find((job) => job.id == id && job.queue === queue);
  }
  public findQueue(queue: string) {
    return this.queues.find(({ name }) => queue === name);
  }
}

export const networkMockData = new NetworkMockData();
