import { DataSource } from 'apollo-datasource';
import { JsonService } from '../../../services/json';
import { OrderEnum } from '../../../typings/gql';
import redisInfo from 'redis-info';
import { PowerSearch } from '../../../data-search';
import isNil from 'lodash/isNil';
import { BullMonitorError } from '../../../errors';
import { BullErrorEnum as ErrorEnum } from './errors-enum';
import type { Queue, JobStatus, JobId, JobCounts, Job } from '../../../queue';
import type {
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
  MutationRemoveJobsArgs,
  MutationRemoveJobsByPatternArgs,
  MutationResumeQueueArgs,
  MutationRetryJobArgs,
  MutationRetryJobsArgs,
  MutationUpdateJobDataArgs,
} from '../../../typings/gql';
import type { Maybe } from '../../../typings/utils';

type Config = {
  textSearchScanCount?: number;
};
export class BullDataSource extends DataSource {
  constructor(
    private _queues: Queue[],
    private _queuesMap: Map<string, Queue>,
    private _config: Config
  ) {
    super();
  }

  // queries
  public getQueueById(id: string, throwIfNotFound?: boolean) {
    const queue = this._queuesMap.get(id);
    if (!queue && throwIfNotFound) {
      this._throwQueueNotFound();
    }
    return queue;
  }
  public getQueues(): Queue[] {
    return this._queues;
  }
  public async getQueueJobs({
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
    dataSearch?: string;
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
    const bullQueue = this.getQueueById(queue, true) as Queue;
    if (ids) {
      return await Promise.all(ids.map((id) => bullQueue.getJob(id))).then(
        this._filterJobs
      );
    } else if (id) {
      const job = await bullQueue.getJob(id);
      return job ? [job] : [];
    } else if (dataSearch) {
      if (status) {
        const searcher = new PowerSearch(bullQueue);
        return await searcher
          .search({
            status,
            search: dataSearch,
            offset: offset,
            limit: limit,
            scanCount: this._config.textSearchScanCount,
          })
          .then(this._filterJobs);
      } else {
        this._throwInternalError(ErrorEnum.DATA_SEARCH_STATUS_REQUIRED);
      }
    } else if (status) {
      return await bullQueue
        .getJobs([status], offset, offset + limit - 1, order === OrderEnum.Asc)
        .then(this._filterJobs);
    }
    {
      return [];
    }
  }
  public async getJob(queueId: string, id: JobId, throwIfNotFound?: boolean) {
    const queue = this.getQueueById(queueId, true)!;
    const job = await queue.getJob(id);
    if (!job && throwIfNotFound) {
      this._throwJobNotFound();
    }
    return job;
  }
  public extractJobProcessingTime(job: Job): number {
    if (!job.processedOn || !job.finishedOn) return 0;
    return job.finishedOn - job.processedOn;
  }
  public async getQueueJobsCounts(id: string): Promise<Maybe<JobCounts>> {
    const queue = this.getQueueById(id);
    return await queue?.getJobCounts();
  }
  public async getQueueFailedCount(id: string): Promise<Maybe<number>> {
    const queue = this.getQueueById(id);
    return await queue?.getFailedCount();
  }
  public async getQueueCompletedCount(id: string): Promise<Maybe<number>> {
    const queue = this.getQueueById(id);
    return await queue?.getCompletedCount();
  }
  public async getQueueDelayedCount(id: string): Promise<Maybe<number>> {
    const queue = this.getQueueById(id);
    return await queue?.getDelayedCount();
  }
  public async getQueueActiveCount(id: string): Promise<Maybe<number>> {
    const queue = this.getQueueById(id);
    return await queue?.getActiveCount();
  }
  public async getQueueWaitingCount(id: string): Promise<Maybe<number>> {
    const queue = this.getQueueById(id);
    return await queue?.getWaitingCount();
  }
  public async getQueuePausedCount(id: string): Promise<Maybe<number>> {
    const queue = this.getQueueById(id);
    return await queue?.getPausedCount();
  }
  public async getQueueWaitingOrDelayedJobsCount(
    id: string
  ): Promise<Maybe<number>> {
    const queue = this.getQueueById(id);
    return await queue?.count();
  }
  public async getRedisInfo() {
    if (this._queuesMap.size > 0) {
      const firstQueue = this._queues[0];
      const client = await firstQueue.client;
      const rawInfo = await client.info();
      return redisInfo.parse(rawInfo);
    }
    return null;
  }

  // mutations
  public async createJob({
    queue: queueId,
    name = null,
    data = {},
    options = {},
  }: CreateJobInput) {
    const queue = this.getQueueById(queueId, true)!;
    return await queue.add(
      name as string,
      JsonService.maybeParse(data),
      JsonService.maybeParse(options)
    );
  }
  public async removeJobsByPattern(args: MutationRemoveJobsByPatternArgs) {
    const queue = this.getQueueById(args.queue, true)!;
    await queue.removeJobs(args.pattern);
    return true;
  }
  public async pauseQueue(id: string) {
    const queue = this.getQueueById(id, true)!;
    await queue.pause();
    return queue;
  }
  public async cleanQueue(args: MutationCleanQueueArgs) {
    const queue = this.getQueueById(args.queue, true)!;
    return await queue.clean(
      args.grace as NonNullable<typeof args.grace>,
      args.status,
      args.limit || undefined
    );
  }
  public async emptyQueue(args: MutationEmptyQueueArgs) {
    const queue = this.getQueueById(args.queue, true)!;
    await queue.empty();
    return queue;
  }
  public async closeQueue(args: MutationCloseQueueArgs) {
    const queue = this.getQueueById(args.queue, true)!;
    await queue.close();
    return queue;
  }
  public async resumeQueue(args: MutationResumeQueueArgs) {
    const queue = this.getQueueById(args.queue, true)!;
    await queue.resume();
    return queue;
  }
  public async promoteJob(args: MutationPromoteJobArgs) {
    const job = await this.getJob(args.queue, args.id, true);
    await job?.promote();
    return job;
  }
  public async discardJob(args: MutationDiscardJobArgs) {
    const job = await this.getJob(args.queue, args.id, true);
    await job?.discard();
    return job;
  }
  public async updateJobData(args: MutationUpdateJobDataArgs) {
    const job = await this.getJob(args.queue, args.id, true);
    await job?.update(JsonService.maybeParse(args.data));
    return job;
  }
  public async createJobLog(args: MutationLogArgs) {
    const job = await this.getJob(args.queue, args.id, true);
    await job?.log(args.row);
    return job;
  }
  public async retryJob(args: MutationRetryJobArgs) {
    const job = await this.getJob(args.queue, args.id, true);
    await job?.retry();
    return job;
  }
  public async retryJobs(args: MutationRetryJobsArgs) {
    const jobs = await Promise.all(
      args.jobs.map((jobId) => this.getJob(args.queue, jobId, true))
    );
    await Promise.all(jobs.map((job) => job?.retry()));
    return jobs;
  }
  public async removeJobById(args: MutationRemoveJobArgs) {
    const job = await this.getJob(args.queue, args.id, true);
    await job?.remove();
    return job;
  }
  public async removeJobs(args: MutationRemoveJobsArgs) {
    const jobs = await Promise.all(
      args.jobs.map((jobId) => this.getJob(args.queue, jobId, true))
    );
    await Promise.all(jobs.map((job) => job?.remove()));
    return jobs;
  }
  public async moveJobToCompleted(args: MutationMoveJobToCompletedArgs) {
    const job = await this.getJob(args.queue, args.id, true);
    await job?.moveToCompleted();
    return job;
  }
  public async moveJobToFailed(args: MutationMoveJobToFailedArgs) {
    const job = await this.getJob(args.queue, args.id, true);
    await job?.moveToFailed({
      message: '',
    });
    return job;
  }

  private _filterJobs(jobs: Job[]) {
    return jobs.filter(Boolean);
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
}
