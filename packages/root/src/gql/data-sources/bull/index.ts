import { DataSource } from 'apollo-datasource';
import type { Queue as BullQueue, JobCounts, JobStatus, JobId } from 'bull';
import { JsonService } from '../../../services/json';
import {
  CreateJobInput,
  JobDataSearchInput,
  MutationCleanQueueArgs,
  MutationCloseQueueArgs,
  MutationDiscardJobArgs,
  MutationEmptyQueueArgs,
  MutationLogArgs,
  MutationMoveJobToCompletedArgs,
  MutationMoveJobToFailedArgs,
  MutationPromoteJobArgs,
  MutationRemoveJobArgs,
  MutationRemoveJobsArgs,
  MutationRemoveJobsByPatternArgs,
  MutationResumeQueueArgs,
  MutationRetryJobArgs,
  MutationRetryJobsArgs,
  MutationUpdateJobDataArgs,
  OrderEnum,
} from '../../../typings/gql';
import { Maybe } from '../../../typings/utils';
import redisInfo from 'redis-info';
import { DataTextSearcher } from './data-text-search';
import isNil from 'lodash/isNil';

type Config = {
  textSearchScanCount?: number;
};
export class BullMonitorError extends Error {
  constructor(msg: any) {
    super(msg);
    this.message = msg;
    this.name = 'BullMonitorError';
  }
}
export enum ErrorEnum {
  QUEUE_NOT_FOUND = 'Queue not found',
  JOB_NOT_FOUND = 'Job not found',
  DATA_SEARCH_STATUS_REQUIRED = 'Job status is required for data search',
  BAD_OFFSET = 'Offset should be >= 0',
  BAD_LIMIT = 'Limit should be >= 1',
}
export class BullDataSource extends DataSource {
  private _queuesMap: Map<string, BullQueue> = new Map();
  constructor(private _queues: BullQueue[], private _config: Config) {
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
    ids,
    order = OrderEnum.Desc,
    dataSearch,
  }: {
    limit?: number;
    offset?: number;
    dataSearch?: JobDataSearchInput;
    id?: string;
    order?: OrderEnum;
    ids?: string[];
    status?: JobStatus;
    queue: string;
  }) {
    if (!isNil(offset) && offset < 0) {
      this._throwInternalError(ErrorEnum.BAD_OFFSET);
    }
    if (!isNil(limit) && limit < 1) {
      this._throwInternalError(ErrorEnum.BAD_LIMIT);
    }
    const bullQueue = this.getQueueByName(queue, true) as BullQueue;
    if (ids) {
      const jobs = await Promise.all(ids.map(id => bullQueue.getJob(id)));
      return jobs;
    } else if (id) {
      const job = await bullQueue.getJob(id);
      return job ? [job] : [];
    } else if (dataSearch) {
      if (status) {
        const searcher = new DataTextSearcher(bullQueue);
        return await searcher.search({
          status,
          term: dataSearch.term,
          key: dataSearch.key as string,
          offset: offset,
          limit: limit,
          scanCount: this._config.textSearchScanCount,
        });
      } else {
        this._throwInternalError(ErrorEnum.DATA_SEARCH_STATUS_REQUIRED);
      }
    } else if (status) {
      return await bullQueue.getJobs(
        [status],
        offset,
        offset + limit - 1,
        order === OrderEnum.Asc
      );
    }
    {
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
      args.status,
      args.limit || undefined
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
  async retryJobs(args: MutationRetryJobsArgs) {
    const jobs = await Promise.all(
      args.jobs.map(jobId => this.getJob(args.queue, jobId, true))
    );
    await Promise.all(jobs.map(job => job?.retry()));
    return jobs;
  }
  async removeJobById(args: MutationRemoveJobArgs) {
    const job = await this.getJob(args.queue, args.id, true);
    await job?.remove();
    return job;
  }
  async removeJobs(args: MutationRemoveJobsArgs) {
    const jobs = await Promise.all(
      args.jobs.map(jobId => this.getJob(args.queue, jobId, true))
    );
    await Promise.all(jobs.map(job => job?.remove()));
    return jobs;
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
