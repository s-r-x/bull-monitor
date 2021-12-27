import type { Queue as BullQueue, JobStatus } from './bull-adapters';
import isempty from 'lodash/isEmpty';
import { Readable } from 'stream';
import jsonata from 'jsonata';
import { JsonService } from './services/json';
import { DEFAULT_DATA_SEARCH_SCAN_COUNT } from './constants';

type TSearchArgs = {
  status: JobStatus;
  limit: number;
  offset: number;
  search: string;
  scanCount?: number;
};

type TJobExcerpt = {
  data: string;
  id: string;
};

export class DataSearcher {
  constructor(private _queue: BullQueue) {}
  async search(args: TSearchArgs) {
    let expr: jsonata.Expression;
    try {
      expr = jsonata(args.search);
    } catch (_e) {
      return [];
    }
    const it = this._getIterator(args);
    const start = args.offset;
    const end = args.limit + start;
    const acc: string[] = [];
    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/label
    mainLoop: for await (const jobs of it.generator()) {
      for (const job of jobs) {
        const matched = this._matchData(job.data, expr);
        if (matched) {
          acc.push(job.id);
        }
        if (acc.length >= end) {
          break mainLoop;
        }
      }
    }
    it.destroy();
    const jobs = await Promise.all(
      acc.slice(start, end).map((id) => this._queue.getJob(id))
    );
    return jobs;
  }
  private _getIterator(args: TSearchArgs): AbstractIterator {
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
  private _matchData(data: string, expr: jsonata.Expression): boolean {
    try {
      const result = expr.evaluate(JsonService.maybeParse(data));
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
  constructor(protected _queue: BullQueue, config: TIteratorConfig) {
    this._scanCount = config.scanCount || DEFAULT_DATA_SEARCH_SCAN_COUNT;
  }
  protected async _extractJobsData(ids: string[]): Promise<TJobExcerpt[]> {
    const client = await this._queue.client;
    const pipeline = client.pipeline();
    ids.forEach((id) => pipeline.hmget(this._queue.toKey(id), 'data'));
    const data = await pipeline.exec();
    return data.reduce((acc, [error, [jobData]], idx) => {
      if (!error && jobData && jobData !== '{}' && jobData !== '[]') {
        acc.push({
          data: jobData,
          id: ids[idx],
        });
      }
      return acc;
    }, [] as TJobExcerpt[]);
  }
  abstract generator(): AsyncGenerator<TJobExcerpt[]>;
  abstract destroy(): void;
}
class SetIterator extends AbstractIterator {
  private _stream: Readable;
  constructor(queue: BullQueue, private _key: string, config: TIteratorConfig) {
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
      const data = await this._extractJobsData(filteredIds);
      yield data;
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
  constructor(queue: BullQueue, private _key: string, config: TIteratorConfig) {
    super(queue, config);
  }
  async *generator() {
    const client =await this._queue.client;
    this._ids = await client.lrange(this._key, 0, -1);
    while (true) {
      try {
        const ids = this._nextChunk;
        if (isempty(ids)) {
          return;
        }
        const data = await this._extractJobsData(ids);
        this._incCursor(data.length);
        yield data;
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
