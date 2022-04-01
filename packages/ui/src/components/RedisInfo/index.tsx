import React, { useMemo } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import shallow from 'zustand/shallow';
import { useRedisInfoModalStore } from '@/stores/redis-info-modal';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';
import { useQuery } from 'react-query';
import { useNetwork } from '@/hooks/use-network';
import NetworkRequest from '../NetworkRequest';
import { QueryKeysConfig } from '@/config/query-keys';
import ms from 'ms';
import { getPollingInterval } from '@/stores/network-settings';
import isNil from 'lodash/isNil';

type TKVPairs = [key: string, value: string][];

const useStyles = makeStyles({
  root: {
    width: 400,
    '@media(max-width: 440px)': {
      width: 'auto',
    },
  },
  keyValueRoot: {
    display: 'flex',
    justifyContent: 'space-between',
  },
});
type TKVProps = {
  k: string;
  v?: string;
};
const KV = ({ k, v }: TKVProps) => {
  const cls = useStyles();
  return (
    <ListItem divider>
      <ListItemText>
        <Box className={cls.keyValueRoot}>
          <span>{k}</span>
          <span>{v}</span>
        </Box>
      </ListItemText>
    </ListItem>
  );
};
const RedisInfo = () => {
  const {
    queries: { getRedisInfo },
  } = useNetwork();
  const cls = useStyles();
  const onClose = useRedisInfoModalStore((state) => state.close);
  const refetchInterval = getPollingInterval();
  const { data, status, refetch } = useQuery(
    QueryKeysConfig.redisInfo,
    getRedisInfo,
    {
      refetchInterval,
      select: (data) => data?.redisInfo,
    }
  );
  const pairs: TKVPairs = useMemo(() => {
    if (!data) return [];
    return [
      ['Used memory', data.used_memory_human],
      ['Peak Used memory', data.used_memory_peak_human],
      ['Total memory', data.total_system_memory_human],
      ['Connected clients', data.connected_clients],
      ['Blocked clients', data.blocked_clients],
      ['Uptime', ms(Number(data.uptime_in_seconds) * 1000, { long: true })],
      ['CPU time (minutes)', data.used_cpu_sys],
      ['Fragmentation ratio', data.mem_fragmentation_ratio],
      ['Version', data.redis_version],
      ['Mode', data.redis_mode],
      ['OS', data.os],
      ['Port', data.tcp_port],
    ].filter(([, v]) => !isNil(v)) as TKVPairs;
  }, [data]);
  return (
    <>
      <DialogContent className={cls.root}>
        <NetworkRequest status={status} refetch={refetch}>
          <List dense>
            {pairs.map(([k, v], idx) => (
              <KV key={idx} k={k} v={v} />
            ))}
          </List>
        </NetworkRequest>
      </DialogContent>
      <DialogActions>
        <Button color="inherit" onClick={onClose}>
          Close
        </Button>
      </DialogActions>
    </>
  );
};
export default function RedisInfoModal() {
  const [isOpen, onClose] = useRedisInfoModalStore(
    (state) => [state.isOpen, state.close],
    shallow
  );
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <RedisInfo />
    </Dialog>
  );
}
