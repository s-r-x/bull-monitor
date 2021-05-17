import EventEmitter from 'eventemitter3';

type TEvent = 'drawer/expandCounts' | 'drawer/collapseCounts';

export const eventEmitter = new EventEmitter<TEvent>();
