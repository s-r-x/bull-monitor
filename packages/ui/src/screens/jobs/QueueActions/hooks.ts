import { QueryKeysConfig } from '@/config/query-keys';
import { useNetwork } from '@/hooks/use-network';
import { useQuery } from 'react-query';

export const useIsQueuePaused = (name: string) => {
  const {
    queries: { getIsQueuePaused },
  } = useNetwork();
  const { data } = useQuery(
    [QueryKeysConfig.isQueuePaused, name],
    () => getIsQueuePaused({ name }),
    {
      select: (data) => data?.queue?.isPaused,
    },
  );
  return data;
};
