import type { Queue } from 'bull';

export interface BullMonitorQueue extends Queue {
  id: string;
}

export const patchBullQueue = (queue: Queue): BullMonitorQueue => {
  // @ts-ignore
  queue.id = Buffer.from(queue.keyPrefix + queue.name).toString('base64');
  // @ts-ignore
  return queue;
};
