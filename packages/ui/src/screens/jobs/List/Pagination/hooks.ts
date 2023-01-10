import { useQueueData } from '@/hooks/use-queue-data';
import {
  activeQueueAtom,
  activeStatusAtom,
  jobIdAtom,
} from '@/atoms/workspaces';
import { useAtomValue } from 'jotai/utils';
import { JobStatus } from '@/typings/gql';

export const useCount = (): number => {
  const jobId = useAtomValue(jobIdAtom);
  const status = useAtomValue(activeStatusAtom);
  const activeQueue = useAtomValue(activeQueueAtom) as string;
  const jobsCounts = useQueueData(activeQueue)?.jobsCounts;
  if (
    !jobsCounts ||
    jobId ||
    status === JobStatus.Stuck ||
    status === JobStatus.Unknown
  ) {
    return 0;
  }
  if (status in jobsCounts) {
    return jobsCounts[status];
  }
  return 0;
};
