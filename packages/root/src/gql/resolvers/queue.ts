import { Queue as BullQueue } from 'bull';
import type { TResolvers } from './typings';

export const queueResolver: TResolvers = {
  Queue: {
    async waitingOrDelayedJobsCount(
      parent: BullQueue,
      _,
      { dataSources: { bull } }
    ) {
      return await bull.getQueueWaitingOrDelayedJobsCount(parent.name);
    },
    async jobsCounts(parent: BullQueue, _, { dataSources: { bull } }) {
      return await bull.getQueueJobsCounts(parent.name);
    },
    async isPaused(parent: BullQueue, _, { dataSources: { bull } }) {
      return await parent.isPaused();
    },
    async jobs(parent: BullQueue, _, { dataSources: { bull } }) {
      return await bull.getQueueJobs({
        queue: parent.name,
        status: [],
      });
    },
  },
};
