import { useActiveQueueStore } from '@/stores/active-queue';
import { useFiltersStore } from '@/stores/filters';
import { useQueueData } from '@/hooks/use-queue-data';

export const useCount = (): number => {
  const status = useFiltersStore((state) => state.status);
  const activeQueue = useActiveQueueStore((state) => state.active as string);
  const jobsCounts = useQueueData(activeQueue)?.jobsCounts;
  if (!jobsCounts) {
    return 0;
  }
  if (status in jobsCounts) {
    return jobsCounts[status];
  }
  return 0;
};
