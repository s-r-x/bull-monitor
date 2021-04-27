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
import redisInfo from 'redis-info';

type Maybe<T> = T | undefined;
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
  getQueueByName(name: string) {
    return this._queuesMap.get(name);
  }
  getQueues(): BullQueue[] {
    return this._queues;
  }
  async createJob({
    queue: queueName,
    name = null,
    data = {},
    options = {},
  }: CreateJobInput) {
    const queue = this._queuesMap.get(queueName);
    return await queue?.add(
      name as string,
      JsonService.maybeParse(data),
      JsonService.maybeParse(options)
    );
  }
  async getQueueJobs({
    queue,
    limit = 20,
    offset = 0,
    status = [],
    id,
    order = OrderEnum.Desc,
  }: {
    status: JobStatus[];
    queue: string;
    limit?: number;
    offset?: number;
    order?: OrderEnum;
    id?: JobId;
  }) {
    const bullQueue = this.getQueueByName(queue);
    if (id) {
      const job = await bullQueue?.getJob(id);
      return job ? [job] : [];
    }
    return bullQueue?.getJobs(
      status,
      offset,
      offset + limit - 1,
      order === OrderEnum.Asc
    );
  }
  async getJob(queueName: string, id: JobId) {
    const queue = this.getQueueByName(queueName);
    return queue?.getJob(id);
  }
  async getJobLogs(queueName: string, id: number) {
    const queue = this.getQueueByName(queueName);
    return await queue?.getJobLogs(id);
  }
  async createJobLog(args: MutationLogArgs) {
    const job = await this.getJob(args.queue, args.id);
    await job?.log(args.row);
    return job;
  }
  async retryJob(args: MutationRetryJobArgs) {
    const job = await this.getJob(args.queue, args.id);
    await job?.retry();
    return job;
  }
  async removeJobById(args: MutationRemoveJobArgs) {
    const job = await this.getJob(args.queue, args.id);
    await job?.remove();
    return job;
  }
  async moveJobToCompleted(args: MutationMoveJobToCompletedArgs) {
    const job = await this.getJob(args.queue, args.id);
    await job?.moveToCompleted();
    return job;
  }
  async moveJobToFailed(args: MutationMoveJobToFailedArgs) {
    const job = await this.getJob(args.queue, args.id);
    await job?.moveToFailed({
      message: '',
    });
    return job;
  }
  async promoteJob(args: MutationPromoteJobArgs) {
    const job = await this.getJob(args.queue, args.id);
    await job?.promote();
    return job;
  }
  async discardJob(args: MutationDiscardJobArgs) {
    const job = await this.getJob(args.queue, args.id);
    await job?.discard();
    return job;
  }
  async updateJobData(args: MutationUpdateJobDataArgs) {
    const job = await this.getJob(args.queue, args.id);
    await job?.update(JsonService.maybeParse(args.data));
    return job;
  }
  async getQueueJobsCounts(name: string): Promise<Maybe<JobCounts>> {
    const queue = this.getQueueByName(name);
    return await queue?.getJobCounts();
  }
  async pauseQueue(name: string) {
    const queue = this.getQueueByName(name);
    await queue?.pause();
    return queue;
  }
  async cleanQueue(args: MutationCleanQueueArgs) {
    const queue = this.getQueueByName(args.queue);
    return await queue?.clean(
      args.grace as NonNullable<typeof args.grace>,
      args.status
    );
  }
  async emptyQueue(args: MutationEmptyQueueArgs) {
    const queue = this.getQueueByName(args.queue);
    await queue?.empty();
    return queue;
  }
  async closeQueue(args: MutationCloseQueueArgs) {
    const queue = this.getQueueByName(args.queue);
    await queue?.close();
    return queue;
  }
  async resumeQueue(args: MutationResumeQueueArgs) {
    const queue = this.getQueueByName(args.queue);
    await queue?.resume();
    return queue;
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
  async removeJobsByPattern(args: MutationRemoveJobsByPatternArgs) {
    const queue = this.getQueueByName(args.queue);
    await queue?.removeJobs(args.pattern);
    return true;
  }
  async getRedisInfo() {
    if (this._queuesMap.size > 0) {
      const firstQueue = this._queues[0];
      const rawInfo = await firstQueue.client.info();
      return redisInfo.parse(rawInfo);
    }
    return null;
  }
}
