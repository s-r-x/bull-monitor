import { DataSource } from 'apollo-datasource';
import { MetricsCollector } from '../../../metrics-collector';
import { BullMonitorError } from '../../../errors';
import { MetricsErrorEnum as ErrorEnum } from './errors-enum';

export class MetricsDataSource extends DataSource {
  constructor(private _internalCollector?: MetricsCollector) {
    super();
  }
  public async getMetrics(queue: string, start?: number, end?: number) {
    return await this._collector.extract(queue, start, end);
  }
  public async clearAllMetrics() {
    await this._collector.clearAll();
    return true;
  }
  public async clearMetrics(queue: string) {
    await this._collector.clear(queue);
    return true;
  }

  private _throwInternalError(e: ErrorEnum) {
    throw new BullMonitorError(e);
  }
  private _throwNoCollector() {
    this._throwInternalError(ErrorEnum.NO_COLLECTOR);
  }
  private get _collector() {
    if (!this._internalCollector) {
      this._throwNoCollector();
    }
    return this._internalCollector as NonNullable<MetricsCollector>;
  }
}
