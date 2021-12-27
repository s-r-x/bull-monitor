import { Queue as BullQueue, JobOptions, Job as BullJob } from 'bull';
import { Job, JobId, JobStatus, JobStatusClean, JobCounts, JobLogs } from './base-job';
import { BullJobAdapter } from './bull-job';
import { BaseQueueAdapter } from './base-queue';

export class BullQueueAdapter<T extends unknown = any> extends BaseQueueAdapter<T> {
  #queue: BullQueue<T>;

  constructor(queue: BullQueue<T>) {
    super();
    this.#queue = queue;
  }

  protected normalizeJob<J extends BullJob<T>>(job: J): Job<T> {
    return new BullJobAdapter(job, this);
  }

  public get client() {
    return Promise.resolve(this.#queue.client);
  }

  public get id(): string {
    return Buffer.from(this.#queue.clientName()).toString('base64');
  }

  public get name(): string {
    return this.#queue.name;
  }

  public get token(): string {
    return '';
  }

  public toKey(queueType: string): string {
    return this.#queue.toKey(queueType);
  }

  public async count(): Promise<number> {
    return this.#queue.count();
  }

  public async add(name: string, data: T, opts?: JobOptions): Promise<Job<T>> {
    const job = await this.#queue.add(name, data, opts);
    return this.normalizeJob(job);
  }

  public async pause(isLocal?: boolean, doNotWaitActive?: boolean): Promise<void> {
    return this.#queue.pause(isLocal, doNotWaitActive);
  }

  public async resume(isLocal?: boolean): Promise<void> {
    return this.#queue.resume(isLocal);
  }

  public async clean(grace: number, status?: JobStatusClean, limit?: number): Promise<JobId[]> {
    const jobs = await this.#queue.clean(grace, status, limit);
    return jobs.map(job => String(job.id));
  }

  public async empty(): Promise<void> {
    return this.#queue.empty();
  }

  public async isPaused(): Promise<boolean> {
    return this.#queue.isPaused();
  }

  public async getJob(id: JobId): Promise<Job<T> | undefined> {
    const job = await this.#queue.getJob(id);
    if (job) {
      return this.normalizeJob(job);
    }
  }

  public async getJobs(types: JobStatus[], start?: number, end?: number, asc?: boolean): Promise<Job<T>[]> {
    const jobs = await this.#queue.getJobs(Array.isArray(types) ? types : [types], start, end, asc);
    return jobs.map(job => this.normalizeJob(job));
  }

  public async getJobCounts(): Promise<JobCounts> {
    return this.#queue.getJobCounts();
  }

  public async getActiveCount(): Promise<number> {
    return this.#queue.getActiveCount();
  }

  public async getCompletedCount(): Promise<number> {
    return this.#queue.getCompletedCount();
  }

  public async getFailedCount(): Promise<number> {
    return this.#queue.getFailedCount();
  }

  public async getDelayedCount(): Promise<number> {
    return this.#queue.getDelayedCount();
  }

  public async getWaitingCount(): Promise<number> {
    return this.#queue.getWaitingCount();
  }

  public async getPausedCount(): Promise<number> {
    return this.#queue.getPausedCount();
  }

  public async removeJobs(pattern: string): Promise<void> {
    return this.#queue.removeJobs(pattern);
  }

  public async getJobLogs(jobId: JobId): Promise<JobLogs> {
    return this.#queue.getJobLogs(jobId);
  }

  protected unimplementedEvents: (string | symbol)[] = [
    'active', 'completed', 'drained', 'failed', 'paused', 'resumed', 'progress', 'waiting',
    'global:active', 'global:drained', 'global:failed', 'global:paused', 'global:resumed', 'global:progress', 'global:waiting',
  ];

  #checkEventSupported(event: string | symbol): void {
    if (this.unimplementedEvents.includes(event)) {
      throw new Error(`Unimplemented event: ${String(event)}`);
    }
  }

  public on(event: string | symbol, listener: (...args: any[]) => void): this {
    this.#checkEventSupported(event);
    if (event === 'global:completed') {
      this.#queue.on('global:completed', listener);
    } else {
      super.on(event, listener);
    }
    return this;
  }
  public off(event: string | symbol, listener: (...args: any[]) => void): this {
    this.#checkEventSupported(event);
    if (event === 'global:completed') {
      this.#queue.off('global:completed', listener);
    } else {
      super.off(event, listener);
    }
    return this;
  }

  public async close(doNotWaitJobs?: boolean): Promise<void> {
    return this.#queue.close(doNotWaitJobs);
  }
}
