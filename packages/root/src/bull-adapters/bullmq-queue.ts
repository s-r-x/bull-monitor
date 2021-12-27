import { Queue as BullMQQueue, QueueEvents, JobsOptions, Job as BullMQJob } from 'bullmq';
import { Job, JobId, JobStatus, JobStatusClean, JobCounts, JobLogs } from './base-job';
import { BullMQJobAdapter } from './bullmq-job';
import { BaseQueueAdapter } from './base-queue';

export class BullMQQueueAdapter<T extends unknown = any> extends BaseQueueAdapter<T> {
  #queue: BullMQQueue<T>;
  #queueEvents?: QueueEvents;

  constructor(queue: BullMQQueue<T>) {
    super();
    this.#queue = queue;
  }

  protected normalizeJob<J extends BullMQJob<T>>(job: J): Job<T> {
    return new BullMQJobAdapter(job, this);
  }

  protected get queueEvents(): QueueEvents {
    if (!this.#queueEvents) {
      this.#queueEvents = new QueueEvents(this.#queue.name, this.#queue.opts);
    }
    return this.#queueEvents;
  }

  public get client() {
    return this.#queue.client;
  }

  public get id(): string {
    return Buffer.from((this.#queue.opts.prefix ?? 'bullmq') + this.name).toString('base64');
  }

  public get name(): string {
    return this.#queue.name;
  }

  public get token(): string {
    return this.#queue.token;
  }

  public toKey(queueType: string): string {
    return this.#queue.toKey(queueType);
  }

  public async count(): Promise<number> {
    return this.#queue.count();
  }

  public async add(name: string, data: T, opts?: JobsOptions): Promise<Job<T>> {
    const job = await this.#queue.add(name, data, opts);
    return this.normalizeJob(job);
  }

  public async pause(): Promise<void> {
    return this.#queue.pause();
  }

  public async resume(): Promise<void> {
    return this.#queue.resume();
  }

  public async clean(grace: number, status?: JobStatusClean, limit: number = Number.MAX_SAFE_INTEGER): Promise<JobId[]> {
    return await this.#queue.clean(grace, limit, status);
  }

  public async empty(): Promise<void> {
    return this.#queue.drain();
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

  public async getJobs(types: JobStatus | JobStatus[], start?: number, end?: number, asc?: boolean): Promise<Job<T>[]> {
    const jobs = await this.#queue.getJobs(types, start, end, asc);
    return jobs.map(job => this.normalizeJob(job));
  }

  public async getJobCounts(): Promise<JobCounts> {
    const counts = await this.#queue.getJobCounts(
      'active',
      'completed',
      'failed',
      'delayed',
      'waiting',
      'paused',
    );
    return counts as unknown as JobCounts;
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
    return this.#queue.getJobCountByTypes('paused');
  }

  public async removeJobs(_pattern: string): Promise<void> {
    throw new Error('Not Impl');
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

  #queueEventHandlers = {
    'global:completed': {
      attached: false,
      handler: (opt: any): void => {
        this.emit('global:completed', opt.jobId, opt.returnvalue);
      },
    },
  }

  public on(event: string | symbol, listener: (...args: any[]) => void): this {
    this.#checkEventSupported(event);
    if (event === 'global:completed') {
      const handler = this.#queueEventHandlers[event];
      if (!handler.attached) {
        this.queueEvents.on('completed', handler.handler);
        handler.attached = true;
      }
    }
    super.on(event, listener);
    return this;
  }
  public off(event: string | symbol, listener: (...args: any[]) => void): this {
    this.#checkEventSupported(event);
    if (event === 'global:completed') {
      const handler = this.#queueEventHandlers[event];
      if (handler.attached) {
        this.queueEvents.off('completed', handler.handler);
        handler.attached = false;
      }
    }
    super.off(event, listener);
    return this;
  }

  public async close(): Promise<void> {
    await this.#queue.close();
    if (this.#queueEvents) {
      await this.#queueEvents.close();
    }
  }
}
