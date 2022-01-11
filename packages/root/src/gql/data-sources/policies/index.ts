import { DataSource } from 'apollo-datasource';
import { BullMonitorError } from '../../../errors';
import { Queue } from '../../../queue';
import { PoliciesErrorEnum } from './errors-enum';

export class PoliciesDataSource extends DataSource {
  constructor(private _queues: Map<string, Queue>) {
    super();
  }
  public isQueueReadonly(id: string): boolean {
    return this._queues.get(id)?.readonly ?? false;
  }
  public raiseIfQueueReadonly(id: string): void {
    if (this.isQueueReadonly(id)) {
      throw new BullMonitorError(PoliciesErrorEnum.READ_ONLY_QUEUE);
    }
  }
}
