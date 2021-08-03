import type { JobCounts } from 'bull';
import { MetricsConfig } from './typings/config';
import { JsonService } from './services/json';
import {
  ToadScheduler as Scheduler,
  SimpleIntervalJob as SchedulerJob,
  AsyncTask as SchedulerTask,
} from 'toad-scheduler';
import { BullMonitorQueue } from './queue';

type TMetrics = {
  queue: string;
  timestamp: number;
  counts: JobCounts;
};
export class MetricsCollector {
  constructor(
    queues: BullMonitorQueue[],
    private _config: Required<MetricsConfig>
  ) {
    this._scheduler = new Scheduler();
    this._queues = queues.filter(q => !_config.blacklist.includes(q.name));
  }
  public startCollecting(): void {
    this._maybeCreateJob();
    this._scheduler.addSimpleIntervalJob(this._job);
  }
  public stopCollecting(): void {
    this._scheduler.stop();
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
    this._queues.forEach(queue => {
      pipeline.del(this._buildPersistKey(queue.id));
    });
    await pipeline.exec();
  }
  private _queues: BullMonitorQueue[];
  private _scheduler: Scheduler;
  private _job: SchedulerJob;
  private _maybeCreateJob() {
    if (!this._job) {
      const task = new SchedulerTask('collect-metrics', this._taskFn);
      this._job = new SchedulerJob(this._config.collectInterval, task);
    }
  }
  private _taskFn = async () => {
    const metrics = await this._collect();
    await this._persist(metrics);
  };
  private async _collect(): Promise<TMetrics[]> {
    const timestamp = Date.now();
    return await Promise.all(
      this._queues.map(async queue => ({
        timestamp,
        queue: queue.id,
        counts: await queue.getJobCounts(),
      }))
    );
  }
  private async _persist(metrics: TMetrics[]) {
    const client = this._redisClient;
    const lpopPipeline = client.pipeline();
    await Promise.all(
      metrics.map(async metric => {
        const key = this._buildPersistKey(metric.queue);
        const listLen = await client.rpush(key, JSON.stringify(metric));
        if (listLen > this._config.maxMetrics) {
          lpopPipeline.lpop(key);
        }
      })
    );
    await lpopPipeline.exec();
  }
  private _buildPersistKey(queue: string) {
    return this._config.redisPrefix + queue;
  }
  private get _redisClient() {
    return this._queues[0].client;
  }
}
