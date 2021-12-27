import { default as Bull } from 'bull';
import { Queue as BullMQQueue } from 'bullmq';
import { BullQueueAdapter, BullMQQueueAdapter } from './bull-adapters';

export type BullMonitorQueue = BullQueueAdapter | BullMQQueueAdapter;

export const patchBullQueue = (queue: Bull.Queue | BullMQQueue | BullQueueAdapter | BullMQQueueAdapter): BullMonitorQueue => {
  let q: BullQueueAdapter | BullMQQueueAdapter;
  if (queue instanceof Bull) {
    q = new BullQueueAdapter(queue);
  } else if (queue instanceof BullMQQueue) {
    q = new BullMQQueueAdapter(queue)
  } else if (queue instanceof BullQueueAdapter || queue instanceof BullMQQueueAdapter) {
    q = queue;
  } else {
    throw new Error('Unsupports queue!');
  }
  return q;
};
