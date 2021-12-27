import { Job as BullJob } from 'bull';
import { BaseJobAdapter, JobStatus, JobId, JobOptions } from './base-job';
import { Queue } from './base-queue';

export class BullJobAdapter<T extends unknown = any> extends BaseJobAdapter<T> {
  #job: BullJob<T>;
  #queue: Queue<T>;

  constructor(job: BullJob<T>, queue: Queue<T>) {
    super();
    this.#job = job;
    this.#queue = queue;
  }

  public get queue(): Queue<T> {
    return this.#queue;
  }

  public get id(): JobId {
    return String(this.#job.id);
  }

  public get name(): string {
    return this.#job.name;
  }

  public get data(): T {
    return this.#job.data;
  }

  public get returnvalue(): unknown {
    return this.#job.returnvalue;
  }

  public get progress(): number | object {
    return this.#job.progress();
  }

  public get attemptsMade(): number {
    return this.#job.attemptsMade;
  }

  public get failedReason(): string | undefined {
    return this.#job.failedReason;
  }

  public get stacktrace(): string[] {
    return this.#job.stacktrace;
  }

  public get opts(): JobOptions {
    return this.#job.opts;
  }

  public get processedOn(): number | undefined {
    return this.#job.processedOn;
  }

  public get finishedOn(): number | undefined {
    return this.#job.finishedOn;
  }

  public get timestamp(): number {
    return this.#job.timestamp;
  }

  public async getState(): Promise<JobStatus> {
    return this.#job.getState();
  }

  public async moveToCompleted(returnValue?: string): Promise<any> {
    return this.#job.moveToCompleted(returnValue);
  }

  public async moveToFailed(reason: Error): Promise<any> {
    return this.#job.moveToFailed(reason);
  }

  public async promote(): Promise<void> {
    return this.#job.promote();
  }
  public async discard(): Promise<void> {
    return this.#job.discard();
  }
  public async update(data: T): Promise<void> {
    return this.#job.update(data);
  }
  public async retry(): Promise<void> {
    return this.#job.retry();
  }
  public async remove(): Promise<void> {
    return this.#job.remove();
  }
  public async log(row: string): Promise<void> {
    return this.#job.log(row);
  }

  public unwarp(): BullJob<T> {
    return this.#job;
  }
}
