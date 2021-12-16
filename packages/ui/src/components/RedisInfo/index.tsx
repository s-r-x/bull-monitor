import React from 'react';
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
  return (
    <>
      <DialogContent className={cls.root}>
        <NetworkRequest status={status} refetch={refetch}>
          {data && (
            <List dense>
              <KV k="Used memory" v={data.used_memory_human} />
              <KV k="Peak Used memory" v={data.used_memory_peak_human} />
              <KV k="Total memory" v={data.total_system_memory_human} />
              <KV k="Connected clients" v={data.connected_clients} />
              <KV k="Blocked clients" v={data.blocked_clients} />
              <KV
                k="Uptime"
                v={ms(Number(data.uptime_in_seconds) * 1000, { long: true })}
              />
              <KV k="CPU time (minutes)" v={data.used_cpu_sys} />
              <KV k="Fragmentation ratio" v={data.mem_fragmentation_ratio} />
              <KV k="Version" v={data.redis_version} />
              <KV k="Mode" v={data.redis_mode} />
              <KV k="OS" v={data.os} />
              <KV k="Port" v={data.tcp_port} />
            </List>
          )}
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
