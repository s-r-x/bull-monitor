import { BullMonitorExpress } from '@bull-monitor/express';
import { InjectQueue } from '@nestjs/bull';
import { Injectable } from '@nestjs/common';
import { Queue } from 'bull';

@Injectable()
export class BullMonitorService extends BullMonitorExpress {
  constructor(@InjectQueue('person') personQueue: Queue) {
    super({ queues: [personQueue] });
  }
}
