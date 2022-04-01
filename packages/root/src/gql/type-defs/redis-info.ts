import { gql } from 'apollo-server-core';

export const redisInfoTypeDef = gql`
  type RedisInfo {
    redis_version: String
    used_memory: String
    used_memory_human: String
    used_memory_peak: String
    used_memory_peak_human: String
    used_memory_peak_perc: String
    used_memory_overhead: String
    used_memory_startup: String
    total_system_memory: String
    total_system_memory_human: String
    maxmemory: String
    maxmemory_human: String
    mem_fragmentation_ratio: String
    mem_fragmentation_bytes: String
    connected_clients: String
    blocked_clients: String
    redis_mode: String
    os: String
    arch_bits: String
    uptime_in_seconds: String
    uptime_in_days: String
    used_cpu_sys: String
    tcp_port: String
  }
`;
