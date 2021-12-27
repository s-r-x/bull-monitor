import type {
  JobStatus as BullJobStatus, JobStatusClean as BullJobStatusClean, JobCounts as BullJobCounts,
  JobOptions as BullJobOptions,
} from 'bull';
import type {
  JobsOptions as BullMQJobOptions,
} from 'bullmq';
import { Queue } from './base-queue';

export type JobId = string;
export type JobStatus = BullJobStatus;
export type JobStatusClean = BullJobStatusClean;
export type JobCounts = BullJobCounts;
export type JobOptions = BullJobOptions | BullMQJobOptions;
export interface JobLogs {
  logs: string[];
  count: number;
}

export abstract class BaseJobAdapter<T extends unknown> {
  public abstract get queue(): Queue<T>;
  public abstract get id(): JobId;
  public abstract get name(): string;
  public abstract get data(): T;
  public abstract get returnvalue(): unknown;
  public abstract get progress(): number | object;
  public abstract get attemptsMade(): number;
  public abstract get failedReason(): string | undefined;
  public abstract get stacktrace(): string[];
  public abstract get opts(): JobOptions;
  public abstract get processedOn(): number | undefined;
  public abstract get finishedOn(): number | undefined;
  public abstract get timestamp(): number;

  public abstract getState(): Promise<JobStatus>;
  public abstract moveToCompleted(returnValue?: unknown): Promise<unknown>;
  public abstract moveToFailed(reason: unknown): Promise<void>;

  public abstract promote(): Promise<void>;
  public abstract discard(): Promise<void>;
  public abstract update(data: T): Promise<void>;
  public abstract retry(): Promise<void>;
  public abstract remove(): Promise<void>;
  public abstract log(row: string): Promise<void>;


  public abstract unwarp(): unknown;
}

export type Job<T extends unknown = any> = BaseJobAdapter<T>;
