import { JsonService } from './services/json';
import {
  ToadScheduler as Scheduler,
  SimpleIntervalJob as SchedulerJob,
  AsyncTask as SchedulerTask,
} from 'toad-scheduler';
import sum from 'lodash/sum';
import isEmpty from 'lodash/isEmpty';
import round from 'lodash/round';
import type { Queue, JobCounts, JobId } from './queue';
import type { MetricsConfig } from './typings/config';

type TMetrics = {
  queue: string;
  timestamp: number;
  counts: JobCounts;
  processingTime?: number;
  processingTimeMin?: number;
  processingTimeMax?: number;
};

export class MetricsCollector {
  private _processingTimeGauge: Map<string, number[]> = new Map();
  private _queues: Queue[];
  private _scheduler: Scheduler;
  private _schedulerJob: SchedulerJob;
  private _isActive = false;

  constructor(queues: Queue[], private _config: Required<MetricsConfig>) {
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
    const client = await this._redisClient;
    const metrics = await client.lrange(key, start, end);
    return metrics.map(JsonService.maybeParse).filter(Boolean);
  }
  public async clear(queue: string): Promise<void> {
    const client = await this._redisClient;
    await client.del(this._buildPersistKey(queue));
  }
  public async clearAll(): Promise<void> {
    const client = await this._redisClient;
    const pipeline = client.pipeline();
    this._queues.forEach((queue) => {
      pipeline.del(this._buildPersistKey(queue.id));
    });
    await pipeline.exec();
  }
  public set queues(queues: Queue[]) {
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
    try {
      const metrics = await this._collect();
      await this._persist(metrics);
    } catch (e) {
      console.error('[bull-monitor] metrics collector error: ', e);
    }
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
          ...processingTime,
        };
      })
    );
  }
  private async _persist(metrics: TMetrics[]) {
    const client = await this._redisClient;
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
      queue.onGlobalJobCompletion = cb;
    }
  }
  private _detachCompletionCbs() {
    for (const queue of this._queues) {
      queue.onGlobalJobCompletion = null;
    }
  }
  private async _onJobComplete(queue: Queue, jobId: JobId) {
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
  private _extractProcessingTime(
    queue: string
  ): Pick<
    TMetrics,
    'processingTime' | 'processingTimeMax' | 'processingTimeMin'
  > {
    const stats = this._processingTimeGauge.get(queue);
    if (isEmpty(stats)) return {};
    return {
      processingTime: this._normalizeProcessingTime(sum(stats) / stats!.length),
      processingTimeMin: this._normalizeProcessingTime(Math.min(...stats!)),
      processingTimeMax: this._normalizeProcessingTime(Math.max(...stats!)),
    };
  }
  private _normalizeProcessingTime(time: number) {
    return round(time, 2);
  }
  private _buildPersistKey(queue: string) {
    return this._config.redisPrefix + queue;
  }
  private get _redisClient() {
    return this._queues[0].client;
  }
}
