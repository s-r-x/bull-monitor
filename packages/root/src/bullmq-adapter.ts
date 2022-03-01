import { Queue as BullMQQueue, QueueEvents, Job as BullMQJob } from 'bullmq';
import { Job, Queue, QueueProvider } from './queue';
import type {
  JobId,
  JobStatus,
  JobStatusClean,
  JobCounts,
  JobLogs,
  GlobalJobCompletionCb,
  QueueConfig,
} from './queue';
import type { Maybe } from './typings/utils';

export class BullMQJobAdapter extends Job {
  constructor(private _job: BullMQJob, private _queue: Queue) {
    super();
  }

  // getters
  public get queue(): Queue {
    return this._queue;
  }

  public get id(): JobId {
    return String(this._job.id);
  }

  public get name(): string {
    return this._job.name;
  }

  public get data() {
    return this._job.data;
  }

  public get returnvalue(): unknown {
    return this._job.returnvalue;
  }

  public get progress(): number {
    const progress = this._job.progress;
    if (typeof progress === 'number') {
      return progress;
    }
    return 0;
  }

  public get attemptsMade(): number {
    return this._job.attemptsMade;
  }

  public get failedReason(): string | undefined {
    return this._job.failedReason;
  }

  public get stacktrace(): string[] {
    return this._job.stacktrace;
  }

  public get opts() {
    return this._job.opts;
  }

  public get processedOn(): Maybe<number> {
    return this._job.processedOn || undefined;
  }

  public get finishedOn(): Maybe<number> {
    return this._job.finishedOn || undefined;
  }

  public get timestamp(): Maybe<number> {
    return this._job.timestamp || undefined;
  }

  public async getState(): Promise<JobStatus> {
    const status = await this._job.getState();
    return status as JobStatus;
  }

  public async moveToCompleted(returnValue: any): Promise<any> {
    return this._job.moveToCompleted(returnValue, this._queue.token);
  }

  public async moveToFailed(reason: Error): Promise<void> {
    return this._job.moveToFailed(reason, this._queue.token);
  }

  public async promote(): Promise<void> {
    return this._job.promote();
  }
  public async discard(): Promise<void> {
    return this._job.discard();
  }
  public async update(data: any): Promise<void> {
    return this._job.update(data);
  }
  public async retry(): Promise<void> {
    return this._job.retry();
  }
  public async remove(): Promise<void> {
    return this._job.remove();
  }
  public async log(row: string): Promise<void> {
    await this._job.log(row);
  }
}

type InternalGlobalJobCompletionCb = (value: any) => void;
export class BullMQAdapter extends Queue {
  private _queueEvents?: QueueEvents;
  private _globalJobCompletionCb?: InternalGlobalJobCompletionCb;
  private _id: string;

  constructor(private _queue: BullMQQueue, config?: QueueConfig) {
    super(_queue, config);
    this._id = Buffer.from(
      (this._queue.opts.prefix ?? 'bullmq') + this.name
    ).toString('base64');
  }

  // getters
  public get provider(): QueueProvider {
    return QueueProvider.Bullmq;
  }
  private get queueEvents(): QueueEvents {
    if (!this._queueEvents) {
      this._queueEvents = new QueueEvents(this._queue.name, this._queue.opts);
    }
    return this._queueEvents;
  }

  public get client() {
    return this._queue.client;
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._queue.name;
  }

  public get token(): string {
    return this._queue.token;
  }

  // setters
  public set onGlobalJobCompletion(callback: GlobalJobCompletionCb) {
    const oldCb = this._globalJobCompletionCb;
    if (oldCb) {
      this.queueEvents.off('completed', oldCb);
    }
    if (callback) {
      const normalizedCallback = (value: any) => {
        callback(value.jobId);
      };
      this._globalJobCompletionCb = normalizedCallback;
      this.queueEvents.on('completed', normalizedCallback);
    } else {
      this._globalJobCompletionCb = undefined;
    }
  }

  // public methods
  public toKey(queueType: string): string {
    return this._queue.toKey(queueType);
  }

  public async count(): Promise<number> {
    return this._queue.count();
  }

  public async add(name: string, data: any, opts?: any): Promise<Job> {
    const job = await this._queue.add(name, data, opts);
    return this.normalizeJob(job);
  }

  public async pause(): Promise<void> {
    return this._queue.pause();
  }

  public async resume(): Promise<void> {
    return this._queue.resume();
  }

  public async clean(
    grace: number,
    status?: JobStatusClean,
    limit: number = Number.MAX_SAFE_INTEGER
  ): Promise<JobId[]> {
    return await this._queue.clean(grace, limit, status);
  }

  public async empty(): Promise<void> {
    return this._queue.drain();
  }

  public async isPaused(): Promise<boolean> {
    return this._queue.isPaused();
  }

  public async getJob(id: JobId): Promise<Maybe<Job>> {
    const job = await this._queue.getJob(id);
    if (job) {
      return this.normalizeJob(job);
    }
  }

  public async getJobs(
    types: JobStatus | JobStatus[],
    start?: number,
    end?: number,
    asc?: boolean
  ): Promise<Job[]> {
    const jobs = await this._queue.getJobs(types as any, start, end, asc);
    return jobs.map((job) => this.normalizeJob(job));
  }

  public async getJobCounts(): Promise<JobCounts> {
    const counts = await this._queue.getJobCounts(
      'active',
      'completed',
      'failed',
      'delayed',
      'waiting',
      'paused'
    );
    return counts as unknown as JobCounts;
  }

  public async getActiveCount(): Promise<number> {
    return this._queue.getActiveCount();
  }

  public async getCompletedCount(): Promise<number> {
    return this._queue.getCompletedCount();
  }

  public async getFailedCount(): Promise<number> {
    return this._queue.getFailedCount();
  }

  public async getDelayedCount(): Promise<number> {
    return this._queue.getDelayedCount();
  }

  public async getWaitingCount(): Promise<number> {
    return this._queue.getWaitingCount();
  }

  public async getPausedCount(): Promise<number> {
    return this._queue.getJobCountByTypes('paused');
  }

  public async removeJobs(): Promise<void> {
    throw new Error('Not implemented');
  }

  public async getJobLogs(jobId: JobId): Promise<JobLogs> {
    return this._queue.getJobLogs(jobId);
  }
  public async close(): Promise<void> {
    await this._queue.close();
    if (this._queueEvents) {
      await this._queueEvents.close();
    }
  }

  // private methods
  private normalizeJob(job: BullMQJob): Job {
    return new BullMQJobAdapter(job, this);
  }
}
