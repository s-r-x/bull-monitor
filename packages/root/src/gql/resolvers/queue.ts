import { Queue } from '../../queue';
import type { TResolvers } from './typings';

export const queueResolver: TResolvers = {
  Queue: {
    async count(parent: Queue, _, { dataSources: { bull } }) {
      return await bull.getQueueWaitingOrDelayedJobsCount(parent.id);
    },
    async readonly(parent: Queue, _, { dataSources: { policies } }) {
      return policies.isQueueReadonly(parent.id);
    },
    async failedCount(parent: Queue, _, { dataSources: { bull } }) {
      return await bull.getQueueFailedCount(parent.id);
    },
    async completedCount(parent: Queue, _, { dataSources: { bull } }) {
      return await bull.getQueueCompletedCount(parent.id);
    },
    async delayedCount(parent: Queue, _, { dataSources: { bull } }) {
      return await bull.getQueueDelayedCount(parent.id);
    },
    async activeCount(parent: Queue, _, { dataSources: { bull } }) {
      return await bull.getQueueActiveCount(parent.id);
    },
    async waitingCount(parent: Queue, _, { dataSources: { bull } }) {
      return await bull.getQueueWaitingCount(parent.id);
    },
    async pausedCount(parent: Queue, _, { dataSources: { bull } }) {
      return await bull.getQueueWaitingCount(parent.id);
    },
    async jobsCounts(parent: Queue, _, { dataSources: { bull } }) {
      return await bull.getQueueJobsCounts(parent.id);
    },
    async isPaused(parent: Queue) {
      return await parent.isPaused();
    },
    async jobs(parent: Queue, _, { dataSources: { bull } }) {
      return await bull.getQueueJobs({
        queue: parent.id,
      });
    },
    async metrics(parent: Queue, _, { dataSources: { metrics } }) {
      return await metrics.getMetrics(parent.id);
    },
  },
};
