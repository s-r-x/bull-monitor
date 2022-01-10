import type {
  QueryJobArgs,
  QueryMetricsArgs,
  QueryQueueArgs,
} from '../../typings/gql';
import type { TResolvers } from './typings';

export const queryResolver: TResolvers = {
  Query: {
    async redisInfo(_, __, { dataSources: { bull } }) {
      return await bull.getRedisInfo();
    },
    async metrics(_, args: QueryMetricsArgs, { dataSources: { metrics } }) {
      return await metrics.getMetrics(
        args.queue,
        args.start as number,
        args.end as number
      );
    },
    queues(_, __, { dataSources: { bull } }) {
      return bull.getQueues();
    },
    queue(_, args: QueryQueueArgs, { dataSources: { bull } }) {
      return bull.getQueueById(args.id);
    },
    async jobs(_, args, { dataSources: { bull } }) {
      return await bull.getQueueJobs(args);
    },
    async job(_parent, { queue, id }: QueryJobArgs, { dataSources: { bull } }) {
      return await bull.getJob(queue, id);
    },
  },
};
