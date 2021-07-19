import React from 'react';
import Chart from './Chart';
import Actions from './Actions';
import { useQuery } from 'react-query';
import { useNetwork } from '@/hooks/use-network';
import { useAtomValue } from 'jotai/utils';
import { activeQueueAtom } from '@/atoms/workspaces';
import NetworkRequest from '@/components/NetworkRequest';
import { getPollingInterval } from '@/stores/network-settings';
import { QueryKeysConfig } from '@/config/query-keys';
import isempty from 'lodash/isEmpty';
import Alert from '@material-ui/lab/Alert';

const MetricsScreen = () => {
  const {
    queries: { getQueueMetrics },
  } = useNetwork();
  const queue = useAtomValue(activeQueueAtom) as string;
  const refetchInterval = getPollingInterval();
  const { status, refetch, data, error } = useQuery(
    [
      QueryKeysConfig.metrics,
      {
        queue,
      },
    ],
    () => getQueueMetrics({ queue }),
    {
      refetchInterval,
      select: (d) => d?.metrics ?? [],
    },
  );
  return (
    <NetworkRequest error={error} refetch={refetch} status={status}>
      <Actions />
      {!data || isempty(data) ? (
        <Alert severity="warning">No metrics</Alert>
      ) : (
        <Chart metrics={data} />
      )}
    </NetworkRequest>
  );
};

export default MetricsScreen;
