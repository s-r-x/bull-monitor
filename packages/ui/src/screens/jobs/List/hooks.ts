import { useNetwork } from '@/hooks/use-network';
import { QueryKeysConfig } from '@/config/query-keys';
import { useFiltersStore } from '@/stores/filters';
import { useQuery } from 'react-query';
import { useActiveQueueStore } from '@/stores/active-queue';
import shallow from 'zustand/shallow';
import { usePaginationStore } from '@/stores/pagination';
import { getPollingInterval } from '@/stores/network-settings';
import { useRefetchJobsLockStore } from '@/stores/refetch-jobs-lock';

export const useJobsQuery = () => {
  const {
    queries: { getJobs },
  } = useNetwork();
  const [page, perPage] = usePaginationStore(
    (state) => [state.page, state.perPage],
    shallow,
  );
  const [statuses, order, jobId] = useFiltersStore(
    (state) => [state.statuses, state.order, state.jobId],
    shallow,
  );
  const isFetchLocked = useRefetchJobsLockStore((state) => state.isLocked);
  const refetchInterval = getPollingInterval();
  const queue = useActiveQueueStore((state) => state.active as string);
  return useQuery(
    [
      QueryKeysConfig.jobsList,
      {
        queue,
        perPage,
        page,
        statuses,
        order,
        id: jobId,
      },
    ],
    () =>
      getJobs({
        queue,
        limit: perPage,
        offset: page * perPage,
        statuses,
        order,
        id: jobId,
      }),
    {
      keepPreviousData: true,
      refetchInterval: isFetchLocked ? false : refetchInterval,
    },
  );
};
