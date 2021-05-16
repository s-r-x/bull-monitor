import type { GetRedisInfoQuery } from '@/typings/gql';

export const getRedisInfoMock = (): Promise<GetRedisInfoQuery> => {
  return Promise.resolve({
    redisInfo: {
      blocked_clients: '1',
      connected_clients: '7',
      mem_fragmentation_ratio: '2.69',
      os: 'Linux 5.8.0-50-generic x86_64',
      redis_mode: 'standalone',
      redis_version: '5.0.4',
      tcp_port: '6379',
      total_system_memory_human: '7.74G',
      uptime_in_seconds: '112',
      used_cpu_sys: '0.134950',
      used_memory_human: '1.04M',
      used_memory_peak_human: '1.20M',
    },
  });
};
