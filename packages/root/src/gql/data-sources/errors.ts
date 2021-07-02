export class BullMonitorError extends Error {
  constructor(msg: any) {
    super(msg);
    this.message = msg;
    this.name = 'BullMonitorError';
  }
}
