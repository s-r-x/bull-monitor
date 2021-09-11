import type { GetRedisInfoQuery } from '@/typings/gql';
import { gqlClient } from '@/network/gql-client';
import { gql } from 'graphql-request';

export const getRedisInfo = (): Promise<GetRedisInfoQuery> =>
  gqlClient.request(
    gql`
      query GetRedisInfo {
        redisInfo {
          redis_version
          redis_mode
          used_memory_human
          used_memory_peak_human
          total_system_memory_human
          connected_clients
          blocked_clients
          mem_fragmentation_ratio
          os
          uptime_in_seconds
          used_cpu_sys
          tcp_port
        }
      }
    `
  );
