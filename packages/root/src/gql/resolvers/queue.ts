import type { Queue } from '../../queue';
import type { TResolvers } from './typings';
import type {
  Queue as GqlQueue,
  QueueMetrics as GqlQueueMetrics,
} from '../../typings/gql';

export const queueResolver: TResolvers = {
  Queue: {
    async count(parent: Queue): Promise<GqlQueue['count']> {
      return await parent.count();
    },
    async failedCount(parent: Queue): Promise<GqlQueue['failedCount']> {
      return await parent.getFailedCount();
    },
    async completedCount(parent: Queue): Promise<GqlQueue['completedCount']> {
      return await parent.getCompletedCount();
    },
    async delayedCount(parent: Queue): Promise<GqlQueue['delayedCount']> {
      return await parent.getDelayedCount();
    },
    async activeCount(parent: Queue): Promise<GqlQueue['activeCount']> {
      return await parent.getActiveCount();
    },
    async waitingCount(parent: Queue): Promise<GqlQueue['waitingCount']> {
      return await parent.getWaitingCount();
    },
    async pausedCount(parent: Queue): Promise<GqlQueue['pausedCount']> {
      return await parent.getPausedCount();
    },
    async jobsCounts(parent: Queue): Promise<GqlQueue['jobsCounts']> {
      return await parent.getJobCounts();
    },
    async isPaused(parent: Queue): Promise<GqlQueue['isPaused']> {
      return await parent.isPaused();
    },
    async jobs(parent: Queue, _, { dataSources: { bull } }) {
      return await bull.getQueueJobs({ queue: parent.id });
    },
    async metrics(
      parent: Queue,
      _,
      { dataSources: { metrics } }
    ): Promise<GqlQueueMetrics[]> {
      return await metrics.getMetrics(parent.id);
    },
  },
};
