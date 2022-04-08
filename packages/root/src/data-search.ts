import isempty from 'lodash/isEmpty';
import { Readable } from 'stream';
import jsonata from 'jsonata';
import { DEFAULT_DATA_SEARCH_SCAN_COUNT } from './constants';
import type { Queue, JobStatus, Job } from './queue';
import type { Maybe } from './typings/utils';

type TSearchArgs = {
  status: JobStatus;
  limit: number;
  offset: number;
  search: string;
  scanCount?: number;
};

type TJobsList = Job[];

export class PowerSearch {
  constructor(private _queue: Queue) {}
  async search(args: TSearchArgs): Promise<TJobsList> {
    let expr: jsonata.Expression;
    try {
      expr = jsonata(args.search);
    } catch (_e) {
      return [];
    }
    const it = this._getIterator(args);
    if (!it) return [];
    const start = args.offset;
    const end = args.limit + start;
    const acc: TJobsList = [];
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label
    mainLoop: for await (const jobs of it.generator()) {
      for (const job of jobs) {
        if (this._evalSearch(job, expr)) {
          acc.push(job);
        }
        if (acc.length >= end) {
          break mainLoop;
        }
      }
    }
    it.destroy();
    return acc.slice(start, end);
  }
  private _getIterator(args: TSearchArgs): Maybe<AbstractIterator> {
    const redisKey = this._queue.toKey(args.status);
    const config: TIteratorConfig = {
      scanCount: args.scanCount,
    };
    switch (args.status) {
      case 'completed':
      case 'failed':
      case 'delayed':
        return new SetIterator(this._queue, redisKey, config);
      case 'active':
      case 'waiting':
      case 'paused':
        return new ListIterator(this._queue, redisKey, config);
    }
  }
  private _evalSearch(job: Job, expr: jsonata.Expression): boolean {
    try {
      const result = expr.evaluate(job.rawJob);
      if (!result) return false;
      return typeof result === 'object' ? !isempty(result) : !!result;
    } catch (_e) {
      return false;
    }
  }
}

type TIteratorConfig = {
  scanCount?: number;
};

abstract class AbstractIterator {
  protected _scanCount: number;
  constructor(protected _queue: Queue, config: TIteratorConfig) {
    this._scanCount = config.scanCount || DEFAULT_DATA_SEARCH_SCAN_COUNT;
  }
  protected async _extractJobs(ids: string[]): Promise<TJobsList> {
    const client = await this._queue.client;
    const pipeline = client.pipeline();
    ids.forEach((id) => pipeline.hgetall(this._queue.toKey(id)));
    const jobs = await pipeline.exec();

    return jobs.reduce((acc, [error, job], idx) => {
      if (!error && job) {
        acc.push(this._queue.jobFromJSON(job, ids[idx]));
      }
      return acc;
    }, [] as TJobsList);
  }
  abstract generator(): AsyncGenerator<TJobsList>;
  abstract destroy(): void;
}
class SetIterator extends AbstractIterator {
  private _stream: Readable;
  constructor(queue: Queue, private _key: string, config: TIteratorConfig) {
    super(queue, config);
  }
  async *generator() {
    const client = await this._queue.client;
    this._stream = client.zscanStream(this._key, {
      count: this._scanCount,
    });
    for await (const ids of this._stream) {
      this._stream.pause();
      const filteredIds = (ids as string[]).filter(
        (_k: string, idx) => !(idx % 2)
      );
      const jobs = await this._extractJobs(filteredIds);
      yield jobs;
      this._stream.resume();
    }
  }
  destroy() {
    if (this._stream) {
      this._stream.destroy();
    }
  }
}
class ListIterator extends AbstractIterator {
  private _ids: string[];
  private _cursor = 0;
  constructor(queue: Queue, private _key: string, config: TIteratorConfig) {
    super(queue, config);
  }
  async *generator() {
    const client = await this._queue.client;
    this._ids = await client.lrange(this._key, 0, -1);
    while (true) {
      try {
        const ids = this._nextChunk;
        if (isempty(ids)) {
          return;
        }
        const jobs = await this._extractJobs(ids);
        this._incCursor(jobs.length);
        yield jobs;
      } catch (e) {
        console.error(e);
        return;
      }
    }
  }
  // noop
  destroy() {}
  private _incCursor(n: number) {
    this._cursor += n;
  }
  private get _nextChunk() {
    return this._ids.slice(this._cursor, this._cursor + this._scanCount);
  }
}
