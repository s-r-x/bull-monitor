import { QueryJobArgs } from '../../typings/gql';
import type { TResolvers } from './typings';

export const queryResolver: TResolvers = {
  Query: {
    async redisInfo(_, __, { dataSources: { bull } }) {
      return await bull.getRedisInfo();
    },
    queues(_, __, { dataSources: { bull } }) {
      return bull.getQueues();
    },
    queue(_, args: { name: string }, { dataSources: { bull } }) {
      return bull.getQueueByName(args.name);
    },
    async jobs(_, args, { dataSources: { bull } }) {
      return await bull.getQueueJobs(args);
    },
    async job(_parent, { queue, id }: QueryJobArgs, { dataSources: { bull } }) {
      return await bull.getJob(queue, id);
    },
  },
};
