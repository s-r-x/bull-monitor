import { Job as BullJob } from '../../bull-adapters';
import { JsonService } from '../../services/json';
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
    data({ data }: BullJob) {
      return JsonService.maybeStringify(data);
    },
    delay({ opts }: BullJob) {
      return opts.delay;
    },
    processingTime(job: BullJob, _vars, { dataSources: { bull } }) {
      return bull.extractJobProcessingTime(job);
    },
    logs(job: BullJob) {
      return job.queue.getJobLogs(job.id);
    },
    returnValue(job: BullJob) {
      return JsonService.maybeStringify(job.returnvalue);
    },
    progress(job: BullJob) {
      return job.progress;
    },
    opts(job: BullJob) {
      return JsonService.maybeStringify(job.opts);
    },
    status(job: BullJob) {
      return job.getState();
    },
  },
};
