import { Queue as BullQueue } from 'bull';
import type { TResolvers } from './typings';

export const queueResolver: TResolvers = {
  Queue: {
    async count(parent: BullQueue, _, { dataSources: { bull } }) {
      return await bull.getQueueWaitingOrDelayedJobsCount(parent.name);
    },
    async failedCount(parent: BullQueue, _, { dataSources: { bull } }) {
      return await bull.getQueueFailedCount(parent.name);
    },
    async completedCount(parent: BullQueue, _, { dataSources: { bull } }) {
      return await bull.getQueueCompletedCount(parent.name);
    },
    async delayedCount(parent: BullQueue, _, { dataSources: { bull } }) {
      return await bull.getQueueDelayedCount(parent.name);
    },
    async activeCount(parent: BullQueue, _, { dataSources: { bull } }) {
      return await bull.getQueueActiveCount(parent.name);
    },
    async waitingCount(parent: BullQueue, _, { dataSources: { bull } }) {
      return await bull.getQueueWaitingCount(parent.name);
    },
    async pausedCount(parent: BullQueue, _, { dataSources: { bull } }) {
      return await bull.getQueueWaitingCount(parent.name);
    },
    async jobsCounts(parent: BullQueue, _, { dataSources: { bull } }) {
      return await bull.getQueueJobsCounts(parent.name);
    },
    async isPaused(parent: BullQueue) {
      return await parent.isPaused();
    },
    async jobs(parent: BullQueue, _, { dataSources: { bull } }) {
      return await bull.getQueueJobs({
        queue: parent.name,
      });
    },
    async metrics(parent: BullQueue, _, { dataSources: { metrics } }) {
      return await metrics.getMetrics(parent.name);
    },
  },
};
