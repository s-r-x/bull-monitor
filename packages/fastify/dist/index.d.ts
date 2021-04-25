import { BullMonitor } from '@bull-monitor/root';
import { ApolloServer } from 'apollo-server-fastify';
import type { FastifyPluginCallback } from 'fastify';
export declare class BullMonitorFastify extends BullMonitor<ApolloServer> {
    plugin: FastifyPluginCallback;
    init(): Promise<void>;
}
