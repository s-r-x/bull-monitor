import { JobStatus } from '@/typings/gql';
import type { Maybe } from '@/typings/utils';
import type { TJobProps } from '../typings';
import day from 'dayjs';

type TProps = Pick<TJobProps, 'job'> & {
  delayTimestamp: Maybe<number>;
};

const SAFE_LAST_STEP = 10;
export const useActiveStep = ({ job, delayTimestamp }: TProps): number => {
  const hasDelay = Boolean(delayTimestamp);
  if ([JobStatus.Completed, JobStatus.Failed].includes(job.status)) {
    return SAFE_LAST_STEP;
  } else if (job.status === JobStatus.Active) {
    return hasDelay ? 2 : 1;
  } else if (job.status === JobStatus.Delayed) {
    if (delayTimestamp && job.timestamp) {
      const now = day();
      return day(job.timestamp + delayTimestamp).isBefore(now) ? 2 : 1;
    } else {
      return 1;
    }
  }
  return 1;
};
