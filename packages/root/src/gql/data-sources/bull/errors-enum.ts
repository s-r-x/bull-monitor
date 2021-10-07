export enum BullErrorEnum {
  QUEUE_NOT_FOUND = 'Queue not found',
  JOB_NOT_FOUND = 'Job not found',
  DATA_SEARCH_STATUS_REQUIRED = 'Job status is required for data search',
  BAD_OFFSET = 'Offset should be >= 0',
  BAD_LIMIT = 'Limit should be >= 1',
}
