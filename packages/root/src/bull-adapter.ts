import type { Queue as BullQueue, Job as BullJob } from 'bull';
import { Queue, Job, QueueProvider } from './queue';
import type {
  JobId,
  JobStatus,
  JobStatusClean,
  JobCounts,
  JobLogs,
  QueueConfig,
  GlobalJobCompletionCb,
} from './queue';
import type { Maybe } from './typings/utils';
// this is required due to bad bull typings
import * as Bull from 'bull';

export class BullJobAdapter extends Job {
  constructor(private _job: BullJob, private _queue: Queue) {
    super();
  }

  // getters
  public get rawJob(): BullJob {
    return this._job;
  }

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

  public get progress(): string {
    return String(this._job.progress()) || '0';
  }

  public get attemptsMade(): number {
    return this._job.attemptsMade;
  }

  public get failedReason(): Maybe<string> {
    return this._job.failedReason;
  }

  public get stacktrace(): string[] {
    return this._job.stacktrace;
  }

  public get opts(): any {
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

  // public methods
  public async getState(): Promise<JobStatus> {
    return this._job.getState() as any;
  }

  public async moveToCompleted(returnValue?: string): Promise<any> {
    return this._job.moveToCompleted(returnValue);
  }

  public async moveToFailed(reason: Error): Promise<any> {
    return this._job.moveToFailed(reason);
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
    return this._job.log(row);
  }
}

export class BullAdapter extends Queue {
  private _id: string;
  private _globalJobCompletionCb?: GlobalJobCompletionCb;

  constructor(private _queue: BullQueue, config?: QueueConfig) {
    super(_queue, config);
    this._id = Buffer.from(this._queue.clientName()).toString('base64');
  }

  // getters
  public get provider(): QueueProvider {
    return QueueProvider.Bull;
  }
  public get client() {
    return Promise.resolve(this._queue.client);
  }

  public get id(): string {
    return this._id;
  }

  public get name(): string {
    return this._queue.name;
  }

  public get token(): string {
    return '';
  }

  // setters
  public set onGlobalJobCompletion(callback: GlobalJobCompletionCb) {
    const oldCb = this._globalJobCompletionCb;
    if (oldCb) {
      this._queue.off('global:completed', oldCb);
    }
    this._globalJobCompletionCb = callback;
    if (callback) {
      this._queue.on('global:completed', callback);
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

  public async pause(
    isLocal?: boolean,
    doNotWaitActive?: boolean
  ): Promise<void> {
    return this._queue.pause(isLocal, doNotWaitActive);
  }

  public async resume(isLocal?: boolean): Promise<void> {
    return this._queue.resume(isLocal);
  }

  public async clean(
    grace: number,
    status?: JobStatusClean,
    limit?: number
  ): Promise<JobId[]> {
    const jobs = await this._queue.clean(grace, status, limit);
    return jobs.map((job) => String(job.id));
  }

  public async empty(): Promise<void> {
    return this._queue.empty();
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
  public jobFromJSON(json: any, jobId: JobId): Job {
    // @ts-ignore
    return this.normalizeJob(Bull.Job.fromJSON(this._queue, json, jobId));
  }

  public async getJobs(
    status: JobStatus,
    start?: number,
    end?: number,
    asc?: boolean
  ): Promise<Job[]> {
    const jobs = await this._queue.getJobs([status as any], start, end, asc);
    return jobs.map((job) => this.normalizeJob(job));
  }

  public async getJobCounts(): Promise<JobCounts> {
    return this._queue.getJobCounts() as any;
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
    return this._queue.getPausedCount();
  }

  public async removeJobs(pattern: string): Promise<void> {
    return this._queue.removeJobs(pattern);
  }
  public async getJobLogs(jobId: JobId): Promise<JobLogs> {
    return this._queue.getJobLogs(jobId);
  }

  public async close(doNotWaitJobs?: boolean): Promise<void> {
    return this._queue.close(doNotWaitJobs);
  }

  // private methods
  private normalizeJob(job: BullJob): Job {
    return new BullJobAdapter(job, this);
  }
}
