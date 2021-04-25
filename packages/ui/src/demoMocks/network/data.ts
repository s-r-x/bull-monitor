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
const jobs = range(JOBS_AMOUNT).map((n) => ({
  id: String(random(0, 1000000)),
  queue: sample(queues)?.name,
  status: sample(Object.values(JobStatus)) as JobStatus,
  progress: 0,
  attemptsMade: 0,
  timestamp: new Date().getTime(),
  name: '__default__',
  opts: '',
  stacktrace: [],
  data: `{"key": "value-${n}"}`,
  logs: {
    count: 0,
    logs: [] as string[],
  },
}));

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
