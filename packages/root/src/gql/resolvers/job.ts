import { JsonService } from '../../services/json';
import type { Job } from '../../queue';
import type { TResolvers } from './typings';
import type { Job as GqlJob } from '../../typings/gql';

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
    data({ data }: Job): GqlJob['data'] {
      return JsonService.maybeStringify(data);
    },
    delay({ opts }: Job): GqlJob['delay'] {
      return opts.delay;
    },
    processingTime(
      job: Job,
      _vars,
      { dataSources: { bull } }
    ): GqlJob['processingTime'] {
      return bull.extractJobProcessingTime(job);
    },
    logs(job: Job): Promise<GqlJob['logs']> {
      return job.queue.getJobLogs(job.id);
    },
    returnValue(job: Job): GqlJob['returnValue'] {
      return JsonService.maybeStringify(job.returnvalue);
    },
    progress(job: Job): GqlJob['progress'] {
      return job.progress;
    },
    opts(job: Job): GqlJob['opts'] {
      return JsonService.maybeStringify(job.opts);
    },
    status(job: Job): Promise<GqlJob['status']> {
      return job.getState();
    },
  },
};
