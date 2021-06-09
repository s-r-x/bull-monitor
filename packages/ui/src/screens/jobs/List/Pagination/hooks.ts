import { useQueueData } from '@/hooks/use-queue-data';
import { activeQueueAtom, activeStatusAtom } from '@/atoms/workspaces';
import { useAtomValue } from 'jotai/utils';

export const useCount = (): number => {
  const status = useAtomValue(activeStatusAtom);
  const activeQueue = useAtomValue(activeQueueAtom) as string;
  const jobsCounts = useQueueData(activeQueue)?.jobsCounts;
  if (!jobsCounts) {
    return 0;
  }
  if (status in jobsCounts) {
    return jobsCounts[status];
  }
  return 0;
};
