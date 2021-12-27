import { EventEmitter } from 'events';
import type {
  RedisClient,
} from 'bullmq';

import type { Job, JobId, JobCounts, JobStatus, JobStatusClean, JobOptions, JobLogs } from './base-job';

export abstract class BaseQueueAdapter<T extends unknown> extends EventEmitter {
  protected abstract normalizeJob(job: unknown): Job<T>;
  protected abstract unimplementedEvents: (string | symbol)[];

  public abstract get client(): Promise<RedisClient>;
  public abstract get id(): string;
  public abstract get name(): string;
  public abstract get token(): string;

  public abstract toKey(queueType: string): string;
  public abstract count(): Promise<number>;
  public abstract add(name: string, data: T, opts?: JobOptions): Promise<Job<T>>;
  public abstract pause(isLocal?: boolean, doNotWaitActive?: boolean): Promise<void>;
  public abstract resume(isLocal?: boolean): Promise<void>;
  public abstract clean(grace: number, status?: JobStatusClean, limit?: number): Promise<JobId[]>;
  public abstract empty(): Promise<void>;
  public abstract isPaused(): Promise<boolean>;

  public abstract getJob(id: JobId): Promise<Job<T> | undefined>;
  public abstract getJobs(types: JobStatus | JobStatus[], start?: number, end?: number, asc?: boolean): Promise<Job<T>[]>;
  public abstract getJobCounts(): Promise<JobCounts>;
  public abstract getActiveCount(): Promise<number>;
  public abstract getCompletedCount(): Promise<number>;
  public abstract getFailedCount(): Promise<number>;
  public abstract getDelayedCount(): Promise<number>;
  public abstract getWaitingCount(): Promise<number>;
  public abstract getPausedCount(): Promise<number>;

  public abstract removeJobs(pattern: string): Promise<void>;
  public abstract getJobLogs(jobId: JobId): Promise<JobLogs>;

  public abstract close(doNotWaitJobs?: boolean): Promise<void>;
}

export type Queue<T extends unknown = any> = BaseQueueAdapter<T>;
