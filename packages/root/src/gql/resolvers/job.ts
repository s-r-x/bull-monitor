import { JsonService } from '../../services/json';
import type { Job } from '../../queue';
import type { TResolvers } from './typings';

export const JobResolver: TResolvers = {
  JobStatus: {
    completed: 'completed',
    waiting: 'waiting',
    active: 'active',
    delayed: 'delayed',
    failed: 'failed',
    paused: 'paused',
  },
  Job: {
    data({ data }: Job) {
      return JsonService.maybeStringify(data);
    },
    delay({ opts }: Job) {
      return opts.delay;
    },
    processingTime(job: Job, _vars, { dataSources: { bull } }) {
      return bull.extractJobProcessingTime(job);
    },
    logs(job: Job) {
      return job.queue.getJobLogs(job.id);
    },
    returnValue(job: Job) {
      return JsonService.maybeStringify(job.returnvalue);
    },
    progress(job: Job) {
      return job.progress;
    },
    opts(job: Job) {
      return JsonService.maybeStringify(job.opts);
    },
    status(job: Job) {
      return job.getState();
    },
  },
};
