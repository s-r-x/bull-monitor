import { DataSource } from 'apollo-datasource';
import type { Queue as BullQueue, JobCounts, JobStatus, JobId } from 'bull';
import { JsonService } from '../../services/json';
import {
  CreateJobInput,
  MutationCleanQueueArgs,
  MutationCloseQueueArgs,
  MutationDiscardJobArgs,
  MutationEmptyQueueArgs,
  MutationLogArgs,
  MutationMoveJobToCompletedArgs,
  MutationMoveJobToFailedArgs,
  MutationPromoteJobArgs,
  MutationRemoveJobArgs,
  MutationRemoveJobsByPatternArgs,
  MutationResumeQueueArgs,
  MutationRetryJobArgs,
  MutationUpdateJobDataArgs,
  OrderEnum,
} from '../../typings/gql';
import { Maybe } from '../../typings/utils';
import redisInfo from 'redis-info';

export class BullMonitorError extends Error {
  constructor(msg: any) {
    super(msg);
    this.message = msg;
    this.name = 'BullMonitorError';
  }
}
export enum ErrorEnum {
  QUEUE_NOT_FOUND = 'QUEUE_NOT_FOUND',
  JOB_NOT_FOUND = 'JOB_NOT_FOUND',
}
export class BullDataSource extends DataSource {
  private _queuesMap: Map<string, BullQueue> = new Map();
  constructor(private _queues: BullQueue[]) {
    super();
    this._convertQueuesToMap(_queues);
  }
  private _convertQueuesToMap(queues: BullQueue[]) {
    queues.forEach(queue => {
      this._queuesMap.set(queue.name, queue);
    });
  }
  private _throwInternalError(e: ErrorEnum) {
    throw new BullMonitorError(e);
  }
  private _throwQueueNotFound() {
    this._throwInternalError(ErrorEnum.QUEUE_NOT_FOUND);
  }
  private _throwJobNotFound() {
    this._throwInternalError(ErrorEnum.JOB_NOT_FOUND);
  }

  // queries
  getQueueByName(name: string, throwIfNotFound?: boolean) {
    const queue = this._queuesMap.get(name);
    if (!queue && throwIfNotFound) {
      this._throwQueueNotFound();
    }
    return queue;
  }
  getQueues(): BullQueue[] {
    return this._queues;
  }
  async getQueueJobs({
    queue,
    limit = 20,
    offset = 0,
    status,
    id,
    order = OrderEnum.Desc,
  }: {
    status?: JobStatus;
    queue: string;
    limit?: number;
    offset?: number;
    order?: OrderEnum;
    id?: JobId;
  }) {
    const bullQueue = this.getQueueByName(queue, true);
    if (id) {
      const job = await bullQueue?.getJob(id);
      return job ? [job] : [];
    } else if (status) {
      return await bullQueue?.getJobs(
        [status],
        offset,
        offset + limit - 1,
        order === OrderEnum.Asc
      );
    } else {
      return [];
    }
  }
  async getJob(queueName: string, id: JobId, throwIfNotFound?: boolean) {
    const queue = this.getQueueByName(queueName, true);
    const job = await queue?.getJob(id);
    if (!job && throwIfNotFound) {
      this._throwJobNotFound();
    }
    return job;
  }
  async getJobLogs(queueName: string, id: number) {
    const queue = this.getQueueByName(queueName, true);
    return await queue?.getJobLogs(id);
  }
  async getQueueJobsCounts(name: string): Promise<Maybe<JobCounts>> {
    const queue = this.getQueueByName(name);
    return await queue?.getJobCounts();
  }
  async getQueueFailedCount(name: string): Promise<Maybe<number>> {
    const queue = this.getQueueByName(name);
    return await queue?.getFailedCount();
  }
  async getQueueCompletedCount(name: string): Promise<Maybe<number>> {
    const queue = this.getQueueByName(name);
    return await queue?.getCompletedCount();
  }
  async getQueueDelayedCount(name: string): Promise<Maybe<number>> {
    const queue = this.getQueueByName(name);
    return await queue?.getDelayedCount();
  }
  async getQueueActiveCount(name: string): Promise<Maybe<number>> {
    const queue = this.getQueueByName(name);
    return await queue?.getActiveCount();
  }
  async getQueueWaitingCount(name: string): Promise<Maybe<number>> {
    const queue = this.getQueueByName(name);
    return await queue?.getWaitingCount();
  }
  async getQueuePausedCount(name: string): Promise<Maybe<number>> {
    const queue = this.getQueueByName(name);
    return await queue?.getPausedCount();
  }
  async getQueueWaitingOrDelayedJobsCount(
    name: string
  ): Promise<Maybe<number>> {
    const queue = this.getQueueByName(name);
    return await queue?.count();
  }
  async getRedisInfo() {
    if (this._queuesMap.size > 0) {
      const firstQueue = this._queues[0];
      const rawInfo = await firstQueue.client.info();
      return redisInfo.parse(rawInfo);
    }
    return null;
  }

  // mutations
  async createJob({
    queue: queueName,
    name = null,
    data = {},
    options = {},
  }: CreateJobInput) {
    const queue = this.getQueueByName(queueName, true);
    return await queue?.add(
      name as string,
      JsonService.maybeParse(data),
      JsonService.maybeParse(options)
    );
  }
  async removeJobsByPattern(args: MutationRemoveJobsByPatternArgs) {
    const queue = this.getQueueByName(args.queue, true);
    await queue?.removeJobs(args.pattern);
    return true;
  }
  async pauseQueue(name: string) {
    const queue = this.getQueueByName(name, true);
    await queue?.pause();
    return queue;
  }
  async cleanQueue(args: MutationCleanQueueArgs) {
    const queue = this.getQueueByName(args.queue, true);
    return await queue?.clean(
      args.grace as NonNullable<typeof args.grace>,
      args.status
    );
  }
  async emptyQueue(args: MutationEmptyQueueArgs) {
    const queue = this.getQueueByName(args.queue, true);
    await queue?.empty();
    return queue;
  }
  async closeQueue(args: MutationCloseQueueArgs) {
    const queue = this.getQueueByName(args.queue, true);
    await queue?.close();
    return queue;
  }
  async resumeQueue(args: MutationResumeQueueArgs) {
    const queue = this.getQueueByName(args.queue, true);
    await queue?.resume();
    return queue;
  }
  async promoteJob(args: MutationPromoteJobArgs) {
    const job = await this.getJob(args.queue, args.id, true);
    await job?.promote();
    return job;
  }
  async discardJob(args: MutationDiscardJobArgs) {
    const job = await this.getJob(args.queue, args.id, true);
    await job?.discard();
    return job;
  }
  async updateJobData(args: MutationUpdateJobDataArgs) {
    const job = await this.getJob(args.queue, args.id, true);
    await job?.update(JsonService.maybeParse(args.data));
    return job;
  }
  async createJobLog(args: MutationLogArgs) {
    const job = await this.getJob(args.queue, args.id, true);
    await job?.log(args.row);
    return job;
  }
  async retryJob(args: MutationRetryJobArgs) {
    const job = await this.getJob(args.queue, args.id, true);
    await job?.retry();
    return job;
  }
  async removeJobById(args: MutationRemoveJobArgs) {
    const job = await this.getJob(args.queue, args.id, true);
    await job?.remove();
    return job;
  }
  async moveJobToCompleted(args: MutationMoveJobToCompletedArgs) {
    const job = await this.getJob(args.queue, args.id, true);
    await job?.moveToCompleted();
    return job;
  }
  async moveJobToFailed(args: MutationMoveJobToFailedArgs) {
    const job = await this.getJob(args.queue, args.id, true);
    await job?.moveToFailed({
      message: '',
    });
    return job;
  }
}
