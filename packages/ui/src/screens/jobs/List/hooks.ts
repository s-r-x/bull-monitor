import { useNetwork } from '@/hooks/use-network';
import { QueryKeysConfig } from '@/config/query-keys';
import { useFiltersStore } from '@/stores/filters';
import { useQuery } from 'react-query';
import { useActiveQueueStore } from '@/stores/active-queue';
import shallow from 'zustand/shallow';
import { usePaginationStore } from '@/stores/pagination';
import {
  getPollingInterval,
  useNetworkSettingsStore,
} from '@/stores/network-settings';
import { useRefetchJobsLockStore } from '@/stores/refetch-jobs-lock';

export const useJobsQuery = () => {
  const {
    queries: { getJobs },
  } = useNetwork();
  const [page, perPage] = usePaginationStore(
    (state) => [state.page, state.perPage],
    shallow,
  );
  const [status, order, jobId, searchKey, searchTerm] = useFiltersStore(
    (state) => [
      state.status,
      state.order,
      state.jobId,
      state.dataSearchKey,
      state.dataSearchTerm,
    ],
    shallow,
  );
  const isFetchLocked = useRefetchJobsLockStore((state) => state.isLocked);
  const [shouldFetchData, textSearchPollingDisabled] = useNetworkSettingsStore(
    (state) => [state.shouldFetchData, state.textSearchPollingDisabled],
    shallow,
  );
  const refetchInterval = getPollingInterval();
  const queue = useActiveQueueStore((state) => state.active as string);
  return useQuery(
    [
      QueryKeysConfig.jobsList,
      {
        queue,
        perPage,
        page,
        status,
        order,
        id: jobId,
        searchKey,
        searchTerm,
        shouldFetchData,
      },
    ],
    () =>
      getJobs({
        queue,
        limit: perPage,
        offset: page * perPage,
        status,
        order,
        id: jobId,
        fetchData: shouldFetchData,
        dataSearch: searchTerm
          ? {
              term: searchTerm,
              key: searchKey,
            }
          : null,
      }),
    {
      keepPreviousData: true,
      refetchInterval:
        isFetchLocked || (textSearchPollingDisabled && searchKey && searchTerm)
          ? false
          : refetchInterval,
    },
  );
};
