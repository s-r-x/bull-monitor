import { useNetwork } from '@/hooks/use-network';
import { QueryKeysConfig } from '@/config/query-keys';
import { useQuery } from 'react-query';
import shallow from 'zustand/shallow';
import { usePaginationStore } from '@/stores/pagination';
import {
  getPollingInterval,
  useNetworkSettingsStore,
} from '@/stores/network-settings';
import { useRefetchJobsLockStore } from '@/stores/refetch-jobs-lock';
import { useAtomValue } from 'jotai/utils';
import {
  activePageAtom,
  activeQueueAtom,
  activeStatusAtom,
  dataSearchAtom,
  jobIdAtom,
  jobsOrderAtom,
} from '@/atoms/workspaces';

export const useJobsQuery = () => {
  const {
    queries: { getJobs },
  } = useNetwork();
  const page = useAtomValue(activePageAtom);
  const perPage = usePaginationStore((state) => state.perPage);
  const status = useAtomValue(activeStatusAtom);
  const queue = useAtomValue(activeQueueAtom) as string;
  const order = useAtomValue(jobsOrderAtom);
  const jobId = useAtomValue(jobIdAtom);
  const dataSearch = useAtomValue(dataSearchAtom);
  const isFetchLocked = useRefetchJobsLockStore((state) => state.isLocked);
  const [shouldFetchData, textSearchPollingDisabled] = useNetworkSettingsStore(
    (state) => [state.shouldFetchData, state.textSearchPollingDisabled],
    shallow
  );
  const refetchInterval = getPollingInterval();
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
        dataSearch,
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
        dataSearch: dataSearch,
      }),
    {
      keepPreviousData: true,
      enabled: Boolean(queue),
      refetchInterval:
        isFetchLocked || (textSearchPollingDisabled && dataSearch)
          ? false
          : refetchInterval,
    }
  );
};
