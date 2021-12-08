import React from 'react';
import JobsCount from './charts/JobsCount';
import ProcessingTime from './charts/ProcessingTime';
import Actions from './Actions';
import { useQuery } from 'react-query';
import { useNetwork } from '@/hooks/use-network';
import { useAtomValue } from 'jotai/utils';
import { activeQueueAtom } from '@/atoms/workspaces';
import NetworkRequest from '@/components/NetworkRequest';
import { getPollingInterval } from '@/stores/network-settings';
import { QueryKeysConfig } from '@/config/query-keys';
import isempty from 'lodash/isEmpty';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  grid: {
    flex: 1,
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
  },
  gridItem: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    [theme.breakpoints.down('md')]: {
      display: 'block',
    },
  },
}));
const MetricsScreen = () => {
  const {
    queries: { getQueueMetrics },
  } = useNetwork();
  const cls = useStyles();
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
    }
  );
  return (
    <NetworkRequest error={error} refetch={refetch} status={status}>
      <Actions />
      {isempty(data) ? (
        <Alert severity="warning">No metrics</Alert>
      ) : (
        <Grid className={cls.grid} container spacing={1}>
          <Grid className={cls.gridItem} item xs={12} sm={6}>
            <JobsCount metrics={data!} />
          </Grid>
          <Grid className={cls.gridItem} item xs={12} sm={6}>
            <ProcessingTime metrics={data!} />
          </Grid>
        </Grid>
      )}
    </NetworkRequest>
  );
};

export default MetricsScreen;
