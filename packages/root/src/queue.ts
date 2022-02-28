import type { Redis, Cluster } from 'ioredis';
import type {
  JobStatus,
  JobStatusClean,
  QueueJobsCounts as JobCounts,
} from './typings/gql';
import { QueueProvider } from './typings/gql';
import type { Maybe } from './typings/utils';

export type { JobStatus, JobStatusClean, JobCounts };
export { QueueProvider };
export type RedisClient = Redis | Cluster;
export type JobId = string;
export type JobOptions = any;
export type GlobalJobCompletionCb = (jobId: JobId) => void;
export interface JobLogs {
  logs: string[];
  count: number;
}
export type QueueConfig = {
  readonly?: boolean;
};

export abstract class Job {
  public abstract get queue(): Queue;
  public abstract get id(): JobId;
  public abstract get name(): string;
  public abstract get data(): any;
  public abstract get returnvalue(): unknown;
  public abstract get progress(): number | Record<string, any>;
  public abstract get attemptsMade(): number;
  public abstract get failedReason(): Maybe<string>;
  public abstract get stacktrace(): string[];
  public abstract get opts(): any;
  public abstract get processedOn(): Maybe<number>;
  public abstract get finishedOn(): Maybe<number>;
  public abstract get timestamp(): Maybe<number>;

  public abstract getState(): Promise<JobStatus>;
  public abstract moveToCompleted(returnValue?: unknown): Promise<unknown>;
  public abstract moveToFailed(reason: unknown): Promise<void>;

  public abstract promote(): Promise<void>;
  public abstract discard(): Promise<void>;
  public abstract update(data: any): Promise<void>;
  public abstract retry(): Promise<void>;
  public abstract remove(): Promise<void>;
  public abstract log(row: string): Promise<void>;
}

export abstract class Queue {
  constructor(_queue: any, protected _config?: QueueConfig) {}
  public get readonly(): boolean {
    return this._config?.readonly ?? false;
  }
  public abstract get provider(): QueueProvider;
  public abstract get client(): Promise<RedisClient>;
  public abstract get id(): string;
  public abstract get name(): string;
  public abstract get token(): string;

  public abstract set onGlobalJobCompletion(
    callback: GlobalJobCompletionCb | null
  );

  public abstract toKey(queueType: string): string;
  public abstract count(): Promise<number>;
  public abstract add(name: string, data: any, opts?: any): Promise<Job>;
  public abstract pause(
    isLocal?: boolean,
    doNotWaitActive?: boolean
  ): Promise<void>;
  public abstract resume(isLocal?: boolean): Promise<void>;
  public abstract clean(
    grace: number,
    status?: JobStatusClean,
    limit?: number
  ): Promise<JobId[]>;
  public abstract empty(): Promise<void>;
  public abstract isPaused(): Promise<boolean>;

  public abstract getJob(id: JobId): Promise<Maybe<Job>>;
  public abstract getJobs(
    types: JobStatus | JobStatus[],
    start?: number,
    end?: number,
    asc?: boolean
  ): Promise<Job[]>;
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
