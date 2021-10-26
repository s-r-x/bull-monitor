import type {
  MutationCleanQueueArgs,
  MutationClearMetricsArgs,
  MutationCloseQueueArgs,
  MutationCreateJobArgs,
  MutationDiscardJobArgs,
  MutationEmptyQueueArgs,
  MutationLogArgs,
  MutationMoveJobToCompletedArgs,
  MutationMoveJobToFailedArgs,
  MutationPauseQueueArgs,
  MutationPromoteJobArgs,
  MutationRemoveJobArgs,
  MutationRemoveJobsArgs,
  MutationRemoveJobsByPatternArgs,
  MutationResumeQueueArgs,
  MutationRetryJobArgs,
  MutationRetryJobsArgs,
  MutationUpdateJobDataArgs,
} from '../../typings/gql';
import type { TResolvers } from './typings';

export const mutationResolver: TResolvers = {
  Mutation: {
    async createJob(
      _,
      args: MutationCreateJobArgs,
      { dataSources: { bull, policies } }
    ) {
      policies.raiseIfQueueReadonly(args.input.queue);
      return await bull.createJob(args.input);
    },
    async pauseQueue(
      _,
      args: MutationPauseQueueArgs,
      { dataSources: { bull, policies } }
    ) {
      policies.raiseIfQueueReadonly(args.queue);
      return await bull.pauseQueue(args.queue);
    },
    async resumeQueue(
      _,
      args: MutationResumeQueueArgs,
      { dataSources: { bull, policies } }
    ) {
      policies.raiseIfQueueReadonly(args.queue);
      return await bull.resumeQueue(args);
    },
    async cleanQueue(
      _,
      args: MutationCleanQueueArgs,
      { dataSources: { bull, policies } }
    ) {
      policies.raiseIfQueueReadonly(args.queue);
      return await bull.cleanQueue(args);
    },
    async emptyQueue(
      _,
      args: MutationEmptyQueueArgs,
      { dataSources: { bull, policies } }
    ) {
      policies.raiseIfQueueReadonly(args.queue);
      return await bull.emptyQueue(args);
    },
    async closeQueue(
      _,
      args: MutationCloseQueueArgs,
      { dataSources: { bull, policies } }
    ) {
      policies.raiseIfQueueReadonly(args.queue);
      return await bull.closeQueue(args);
    },
    moveJobToCompleted(
      _,
      args: MutationMoveJobToCompletedArgs,
      { dataSources: { bull, policies } }
    ) {
      policies.raiseIfQueueReadonly(args.queue);
      return bull.moveJobToCompleted(args);
    },
    moveJobToFailed(
      _,
      args: MutationMoveJobToFailedArgs,
      { dataSources: { bull, policies } }
    ) {
      policies.raiseIfQueueReadonly(args.queue);
      return bull.moveJobToFailed(args);
    },
    discardJob(
      _,
      args: MutationDiscardJobArgs,
      { dataSources: { bull, policies } }
    ) {
      policies.raiseIfQueueReadonly(args.queue);
      return bull.discardJob(args);
    },
    promoteJob(
      _,
      args: MutationPromoteJobArgs,
      { dataSources: { bull, policies } }
    ) {
      policies.raiseIfQueueReadonly(args.queue);
      return bull.promoteJob(args);
    },
    removeJob(
      _,
      args: MutationRemoveJobArgs,
      { dataSources: { bull, policies } }
    ) {
      policies.raiseIfQueueReadonly(args.queue);
      return bull.removeJobById(args);
    },
    removeJobs(
      _,
      args: MutationRemoveJobsArgs,
      { dataSources: { bull, policies } }
    ) {
      policies.raiseIfQueueReadonly(args.queue);
      return bull.removeJobs(args);
    },
    retryJob(
      _,
      args: MutationRetryJobArgs,
      { dataSources: { bull, policies } }
    ) {
      policies.raiseIfQueueReadonly(args.queue);
      return bull.retryJob(args);
    },
    retryJobs(
      _,
      args: MutationRetryJobsArgs,
      { dataSources: { bull, policies } }
    ) {
      policies.raiseIfQueueReadonly(args.queue);
      return bull.retryJobs(args);
    },
    removeJobsByPattern(
      _,
      args: MutationRemoveJobsByPatternArgs,
      { dataSources: { bull, policies } }
    ) {
      policies.raiseIfQueueReadonly(args.queue);
      return bull.removeJobsByPattern(args);
    },
    updateJobData(
      _,
      args: MutationUpdateJobDataArgs,
      { dataSources: { bull, policies } }
    ) {
      policies.raiseIfQueueReadonly(args.queue);
      return bull.updateJobData(args);
    },
    log(_, args: MutationLogArgs, { dataSources: { bull, policies } }) {
      policies.raiseIfQueueReadonly(args.queue);
      return bull.createJobLog(args);
    },
    async clearMetrics(
      _,
      args: MutationClearMetricsArgs,
      { dataSources: { metrics, policies } }
    ) {
      policies.raiseIfQueueReadonly(args.queue);
      return await metrics.clearMetrics(args.queue);
    },
    async clearAllMetrics(_, __, { dataSources: { metrics } }) {
      return await metrics.clearAllMetrics();
    },
  },
};
