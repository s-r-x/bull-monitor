import { getJobData } from '@/network/queries/get-job-data';
import { getJobDataMock } from '@/demo-mocks/network/queries/get-job-data';
import { getJobLogs } from '@/network/queries/get-job-logs';
import { getJobLogsMock } from '@/demo-mocks/network/queries/get-job-logs';
import { getJobs } from '@/network/queries/get-jobs';
import { getJobsMock } from '@/demo-mocks/network/queries/get-jobs';
import { getJobById } from '@/network/queries/get-job-by-id';
import { getJobByIdMock } from '@/demo-mocks/network/queries/get-job-by-id';
import { getRedisInfo } from '@/network/queries/get-redis-info';
import { getRedisInfoMock } from '@/demo-mocks/network/queries/get-redis-info';
import { getQueues } from '@/network/queries/get-queues';
import { createJobLog } from '@/network/mutations/create-job-log';
import { createJobLogMock } from '@/demo-mocks/network/mutations/create-job-log';
import { discardJob } from '@/network/mutations/discard-job';
import { discardJobMock } from '@/demo-mocks/network/mutations/discard-job';
import { moveJobToCompleted } from '@/network/mutations/move-job-to-completed';
import { moveJobToCompletedMock } from '@/demo-mocks/network/mutations/move-job-to-completed';
import { moveJobToFailed } from '@/network/mutations/move-job-to-failed';
import { moveJobToFailedMock } from '@/demo-mocks/network/mutations/move-job-to-failed';
import { promoteJob } from '@/network/mutations/promote-job';
import { promoteJobMock } from '@/demo-mocks/network/mutations/promote-job';
import { retryJob } from '@/network/mutations/retry-job';
import { retryJobMock } from '@/demo-mocks/network/mutations/retry-job';
import { updateJobData } from '@/network/mutations/update-job-data';
import { updateJobDataMock } from '@/demo-mocks/network/mutations/update-job-data';
import { removeJob } from '@/network/mutations/remove-job';
import { removeJobMock } from '@/demo-mocks/network/mutations/remove-job';
import { createJob } from '@/network/mutations/create-job';
import { createJobMock } from '@/demo-mocks/network/mutations/create-job';
import { pauseQueue } from '@/network/mutations/pause-queue';
import { pauseQueueMock } from '@/demo-mocks/network/mutations/pause-queue';
import { resumeQueueMock } from '@/demo-mocks/network/mutations/resume-queue';
import { resumeQueue } from '@/network/mutations/resume-queue';
import { emptyQueue } from '@/network/mutations/empty-queue';
import { emptyQueueMock } from '@/demo-mocks/network/mutations/empty-queue';
import { closeQueueMock } from '@/demo-mocks/network/mutations/close-queue';
import { closeQueue } from '@/network/mutations/close-queue';
import { removeJobsByPatternMock } from '@/demo-mocks/network/mutations/remove-jobs-by-pattern';
import { removeJobsByPattern } from '@/network/mutations/remove-jobs-by-pattern';
import { cleanQueueMock } from '@/demo-mocks/network/mutations/clean-queue';
import { cleanQueue } from '@/network/mutations/clean-queue';
import { retryJobs } from '@/network/mutations/retry-jobs';
import { retryJobsMock } from '@/demo-mocks/network/mutations/retry-jobs';
import { removeJobs } from '@/network/mutations/remove-jobs';
import { removeJobsMock } from '@/demo-mocks/network/mutations/remove-jobs';
import { getQueuesMock } from '@/demo-mocks/network/queries/get-queues';
import { getJobsForExport } from '@/network/queries/get-jobs-for-export';
import { getJobsForExportMock } from '@/demo-mocks/network/queries/get-jobs-for-export';
import { getQueueMetrics } from '@/network/queries/get-queue-metrics';
import { clearMetrics } from '@/network/mutations/clear-metrics';
import { clearAllMetrics } from '@/network/mutations/clear-all-metrics';
import { getQueueMetricsMock } from '@/demo-mocks/network/queries/get-queue-metrics';
import { clearAllMetricsMock } from '@/demo-mocks/network/mutations/clear-all-metrics';
import { clearMetricsMock } from '@/demo-mocks/network/mutations/clear-metrics';

import { EnvConfig } from '@/config/env';

const { useMocks: m } = EnvConfig;

const queries = {
  getJobsForExport: m ? getJobsForExportMock : getJobsForExport,
  getRedisInfo: m ? getRedisInfoMock : getRedisInfo,
  getJobData: m ? getJobDataMock : getJobData,
  getJobLogs: m ? getJobLogsMock : getJobLogs,
  getJobs: m ? getJobsMock : getJobs,
  getJobById: m ? getJobByIdMock : getJobById,
  getQueues: m ? getQueuesMock : getQueues,
  getQueueMetrics: m ? getQueueMetricsMock : getQueueMetrics,
};
const mutations = {
  createJob: m ? createJobMock : createJob,
  createJobLog: m ? createJobLogMock : createJobLog,
  discardJob: m ? discardJobMock : discardJob,
  moveJobToCompleted: m ? moveJobToCompletedMock : moveJobToCompleted,
  moveJobToFailed: m ? moveJobToFailedMock : moveJobToFailed,
  promoteJob: m ? promoteJobMock : promoteJob,
  removeJob: m ? removeJobMock : removeJob,
  retryJob: m ? retryJobMock : retryJob,
  updateJobData: m ? updateJobDataMock : updateJobData,
  pauseQueue: m ? pauseQueueMock : pauseQueue,
  resumeQueue: m ? resumeQueueMock : resumeQueue,
  emptyQueue: m ? emptyQueueMock : emptyQueue,
  closeQueue: m ? closeQueueMock : closeQueue,
  removeJobsByPattern: m ? removeJobsByPatternMock : removeJobsByPattern,
  cleanQueue: m ? cleanQueueMock : cleanQueue,
  retryJobs: m ? retryJobsMock : retryJobs,
  removeJobs: m ? removeJobsMock : removeJobs,
  clearMetrics: m ? clearMetricsMock : clearMetrics,
  clearAllMetrics: m ? clearAllMetricsMock : clearAllMetrics,
};

export const networkContextValue = { mutations, queries };
