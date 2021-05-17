import { useQueueData } from '@/hooks/use-queue-data';

export const useIsQueuePaused = (name: string) => {
  const queueData = useQueueData(name);
  return queueData?.isPaused;
};
