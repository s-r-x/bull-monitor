import type { JobCounts, JobId } from 'bull';
import { MetricsConfig } from './typings/config';
import { JsonService } from './services/json';
import {
  ToadScheduler as Scheduler,
  SimpleIntervalJob as SchedulerJob,
  AsyncTask as SchedulerTask,
} from 'toad-scheduler';
import { BullMonitorQueue } from './queue';
import sum from 'lodash/sum';
import isEmpty from 'lodash/isEmpty';
import round from 'lodash/round';

type TMetrics = {
  queue: string;
  timestamp: number;
  counts: JobCounts;
  processingTime?: number;
};
type TJobCompletionCb = (
  queue: BullMonitorQueue,
  jobId: JobId
) => Promise<void>;

const COMPLETED_EV = 'global:completed';

export class MetricsCollector {
  private _completionCbs: TJobCompletionCb[] = [];
  private _processingTimeGauge: Map<string, number[]> = new Map();
  private _queues: BullMonitorQueue[];
  private _scheduler: Scheduler;
  private _schedulerJob: SchedulerJob;
  private _isActive = false;

  constructor(
    queues: BullMonitorQueue[],
    private _config: Required<MetricsConfig>
  ) {
    this._scheduler = new Scheduler();
    this._queues = queues.filter((q) => !_config.blacklist.includes(q.name));
  }
  public startCollecting(): void {
    this._maybeCreateSchedulerJob();
    this._scheduler.addSimpleIntervalJob(this._schedulerJob);
    this._attachCompletionCbs();
    this._isActive = true;
  }
  public stopCollecting(): void {
    this._scheduler.stop();
    this._detachCompletionCbs();
    this._isActive = false;
  }
  public async extract(
    queue: string,
    start = 0,
    end = -1
  ): Promise<TMetrics[]> {
    const key = this._buildPersistKey(queue);
    const metrics = await this._redisClient.lrange(key, start, end);
    return metrics.map(JsonService.maybeParse).filter(Boolean);
  }
  public async clear(queue: string): Promise<void> {
    await this._redisClient.del(this._buildPersistKey(queue));
  }
  public async clearAll(): Promise<void> {
    const pipeline = this._redisClient.pipeline();
    this._queues.forEach((queue) => {
      pipeline.del(this._buildPersistKey(queue.id));
    });
    await pipeline.exec();
  }
  public set queues(queues: BullMonitorQueue[]) {
    this._queues = queues.filter(
      (q) => !this._config.blacklist.includes(q.name)
    );
    const queuesSet = new Set(this._queues.map(({ id }) => id));
    this._processingTimeGauge.forEach((_, queueId) => {
      if (!queuesSet.has(queueId)) {
        this._processingTimeGauge.delete(queueId);
      }
    });
    if (this._isActive) {
      this._attachCompletionCbs();
    }
  }

  private _maybeCreateSchedulerJob() {
    if (!this._schedulerJob) {
      const task = new SchedulerTask('collect-metrics', this._taskFn);
      this._schedulerJob = new SchedulerJob(this._config.collectInterval, task);
    }
  }
  private _taskFn = async () => {
    const metrics = await this._collect();
    await this._persist(metrics);
  };
  private async _collect(): Promise<TMetrics[]> {
    const timestamp = Date.now();
    return await Promise.all(
      this._queues.map(async (queue) => {
        const processingTime = this._extractProcessingTime(queue.id);
        this._processingTimeGauge.set(queue.id, []);
        return {
          timestamp,
          queue: queue.id,
          counts: await queue.getJobCounts(),
          processingTime,
        };
      })
    );
  }
  private async _persist(metrics: TMetrics[]) {
    const client = this._redisClient;
    const lpopPipeline = client.pipeline();
    await Promise.all(
      metrics.map(async (metric) => {
        const key = this._buildPersistKey(metric.queue);
        const listLen = await client.rpush(key, JSON.stringify(metric));
        if (listLen > this._config.maxMetrics) {
          lpopPipeline.lpop(key);
        }
      })
    );
    await lpopPipeline.exec();
  }
  private _attachCompletionCbs() {
    this._detachCompletionCbs();
    for (const queue of this._queues) {
      const cb = this._onJobComplete.bind(this, queue);
      this._completionCbs.push(cb);
      queue.on(COMPLETED_EV, cb);
    }
  }
  private _detachCompletionCbs() {
    if (this._completionCbs.length > 0) {
      for (const queue of this._queues) {
        for (const cb of this._completionCbs) {
          queue.off(COMPLETED_EV, cb);
        }
      }
    }
  }
  private async _onJobComplete(queue: BullMonitorQueue, jobId: JobId) {
    const job = await queue.getJob(jobId);
    if (!job?.finishedOn || !job.processedOn) {
      return;
    }
    const dur = job.finishedOn - job.processedOn;
    const gauge = this._processingTimeGauge;
    const stats = gauge.get(queue.id);
    if (!stats) {
      gauge.set(queue.id, [dur]);
    } else {
      stats.push(dur);
    }
  }
  private _extractProcessingTime(queue: string): number | undefined {
    const stats = this._processingTimeGauge.get(queue);
    if (isEmpty(stats)) {
      return;
    } else {
      return round(sum(stats) / stats!.length, 2);
    }
  }
  private _buildPersistKey(queue: string) {
    return this._config.redisPrefix + queue;
  }
  private get _redisClient() {
    return this._queues[0].client;
  }
}
