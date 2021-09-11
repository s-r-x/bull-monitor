import { BullDataSource, ErrorEnum } from '.';
import type { Queue, Job } from 'bull';
import { JobStatus, JobStatusClean, OrderEnum } from '../../../typings/gql';

const mockJobId = 'id';
const mockQueueName = 'q';
const none = 'none';
const mockJob = {
  id: mockJobId,
  promote: jest.fn().mockImplementation(() => Promise.resolve()),
  discard: jest.fn().mockImplementation(() => Promise.resolve()),
  update: jest.fn().mockImplementation(() => Promise.resolve()),
  log: jest.fn().mockImplementation(() => Promise.resolve()),
  retry: jest.fn().mockImplementation(() => Promise.resolve()),
  remove: jest.fn().mockImplementation(() => Promise.resolve()),
  moveToCompleted: jest.fn().mockImplementation(() => Promise.resolve()),
  moveToFailed: jest.fn().mockImplementation(() => Promise.resolve()),
} as unknown as Job;
const mockQueue = {
  name: mockQueueName,
  getJob: jest.fn().mockImplementation((id: any) => {
    if (id === mockJobId) {
      return mockJob;
    }
    return null;
  }),
  getJobs: jest.fn().mockImplementation(() => {
    return Promise.resolve([mockJob]);
  }),
  getCompletedCount: jest.fn().mockImplementation(() => Promise.resolve(1)),
  getFailedCount: jest.fn().mockImplementation(() => Promise.resolve(2)),
  getDelayedCount: jest.fn().mockImplementation(() => Promise.resolve(3)),
  getActiveCount: jest.fn().mockImplementation(() => Promise.resolve(4)),
  getWaitingCount: jest.fn().mockImplementation(() => Promise.resolve(5)),
  getPausedCount: jest.fn().mockImplementation(() => Promise.resolve(6)),
  count: jest.fn().mockImplementation(() => Promise.resolve(7)),

  add: jest.fn().mockImplementation(() => Promise.resolve(true)),
  removeJobs: jest.fn().mockImplementation(() => Promise.resolve()),
  pause: jest.fn().mockImplementation(() => Promise.resolve()),
  clean: jest.fn().mockImplementation(() => Promise.resolve([mockJobId])),
  empty: jest.fn().mockImplementation(() => Promise.resolve()),
  close: jest.fn().mockImplementation(() => Promise.resolve()),
  resume: jest.fn().mockImplementation(() => Promise.resolve()),
};
const createDataSrc = () =>
  new BullDataSource([mockQueue as unknown as Queue], {});

afterEach(() => {
  jest.clearAllMocks();
});
describe('bull data source', () => {
  // TODO:: job logs
  // TODO:: redis info
  // TODO:: new ids arg in getJobs
  // TODO:: text search
  describe('Queries', () => {
    test('it should get queue by name', () => {
      expect(createDataSrc().getQueueByName(mockQueueName)).toBe(mockQueue);
      expect(createDataSrc().getQueueByName(none)).toBeUndefined;
      expect(() => createDataSrc().getQueueByName(none, true)).toThrow(
        ErrorEnum.QUEUE_NOT_FOUND
      );
    });
    test('it should get job by id', async () => {
      await expect(
        createDataSrc().getJob(mockQueueName, mockJobId)
      ).resolves.toBe(mockJob);
      expect(mockQueue.getJob).toHaveBeenCalledWith(mockJobId);
      await expect(createDataSrc().getJob(none, mockJobId)).rejects.toThrow(
        ErrorEnum.QUEUE_NOT_FOUND
      );
      await expect(
        createDataSrc().getJob(mockQueueName, none, true)
      ).rejects.toThrow(ErrorEnum.JOB_NOT_FOUND);
      await expect(createDataSrc().getJob(mockQueueName, none)).resolves.toBe(
        null
      );
    });
    test('it should return completed count', async () => {
      await expect(
        createDataSrc().getQueueCompletedCount(mockQueueName)
      ).resolves.toBe(1);
      expect(mockQueue.getCompletedCount).toBeCalled;
      mockQueue.getCompletedCount.mockClear();
      expect(createDataSrc().getQueueCompletedCount(none)).resolves.toBe(
        undefined
      );
      expect(mockQueue.getCompletedCount).not.toBeCalled;
    });
    test('it should return failed count', async () => {
      await expect(
        createDataSrc().getQueueFailedCount(mockQueueName)
      ).resolves.toBe(2);
      expect(mockQueue.getFailedCount).toBeCalled();
      mockQueue.getFailedCount.mockClear();
      await expect(createDataSrc().getQueueFailedCount(none)).resolves.toBe(
        undefined
      );
      expect(mockQueue.getFailedCount).not.toBeCalled;
    });
    test('it should return delayed count', async () => {
      await expect(
        createDataSrc().getQueueDelayedCount(mockQueueName)
      ).resolves.toBe(3);
      expect(mockQueue.getDelayedCount).toBeCalled();
      mockQueue.getDelayedCount.mockClear();
      await expect(createDataSrc().getQueueDelayedCount(none)).resolves.toBe(
        undefined
      );
      expect(mockQueue.getDelayedCount).not.toBeCalled;
    });
    test('it should return active count', async () => {
      await expect(
        createDataSrc().getQueueActiveCount(mockQueueName)
      ).resolves.toBe(4);
      expect(mockQueue.getActiveCount).toBeCalled();
      mockQueue.getActiveCount.mockClear();
      await expect(createDataSrc().getQueueActiveCount(none)).resolves.toBe(
        undefined
      );
      expect(mockQueue.getActiveCount).not.toBeCalled;
    });
    test('it should return waiting count', async () => {
      await expect(
        createDataSrc().getQueueWaitingCount(mockQueueName)
      ).resolves.toBe(5);
      expect(mockQueue.getWaitingCount).toBeCalled();
      mockQueue.getWaitingCount.mockClear();
      await expect(createDataSrc().getQueueWaitingCount(none)).resolves.toBe(
        undefined
      );
      expect(mockQueue.getWaitingCount).not.toBeCalled;
    });
    test('it should return paused count', async () => {
      await expect(
        createDataSrc().getQueuePausedCount(mockQueueName)
      ).resolves.toBe(6);
      expect(mockQueue.getPausedCount).toBeCalled();
      mockQueue.getPausedCount.mockClear();
      await expect(createDataSrc().getQueuePausedCount(none)).resolves.toBe(
        undefined
      );
      expect(mockQueue.getPausedCount).not.toBeCalled;
    });
    test('it should return waiting or delayed count', async () => {
      await expect(
        createDataSrc().getQueueWaitingOrDelayedJobsCount(mockQueueName)
      ).resolves.toBe(7);
      expect(mockQueue.count).toBeCalled();
      mockQueue.count.mockClear();
      await expect(
        createDataSrc().getQueueWaitingOrDelayedJobsCount(none)
      ).resolves.toBe(undefined);
      expect(mockQueue.count).not.toBeCalled;
    });
    describe('Get jobs', () => {
      it('should return array of jobs when id is specified', async () => {
        await expect(
          createDataSrc().getQueueJobs({ queue: mockQueueName, id: mockJobId })
        ).resolves.toStrictEqual([mockJob]);
        expect(mockQueue.getJob).toBeCalledWith(mockJobId);
        expect(mockQueue.getJobs).not.toBeCalled;
        mockQueue.getJob.mockClear();
        await expect(
          createDataSrc().getQueueJobs({ queue: mockQueueName, id: none })
        ).resolves.toHaveLength(0);
        await expect(
          createDataSrc().getQueueJobs({ queue: none, id: mockJobId })
        ).rejects.toThrow(ErrorEnum.QUEUE_NOT_FOUND);
      });
      it('should return an empty array when id and job status are not specified', async () => {
        await expect(
          createDataSrc().getQueueJobs({ queue: mockQueueName })
        ).resolves.toHaveLength(0);
      });
      it('should return array of jobs', async () => {
        await expect(
          createDataSrc().getQueueJobs({
            queue: mockQueueName,
            order: OrderEnum.Asc,
            offset: 10,
            limit: 5,
            status: JobStatus.Active,
          })
        ).resolves.toStrictEqual([mockJob]);
        expect(mockQueue.getJobs).toBeCalledWith(
          [JobStatus.Active],
          10,
          14,
          true
        );
      });
    });
  });
  describe('Mutations', () => {
    it('should create job', async () => {
      const data = { k: 'v' };
      const options = { jobId: 'id' };

      await expect(
        createDataSrc().createJob({
          queue: mockQueueName,
          name: 'name',
          data: JSON.stringify(data),
          options: JSON.stringify(options),
        })
      ).resolves.toEqual(true);
      expect(mockQueue.add).toHaveBeenCalledWith('name', data, options);
      mockQueue.add.mockClear();

      await expect(
        createDataSrc().createJob({
          queue: none,
        })
      ).rejects.toThrow(ErrorEnum.QUEUE_NOT_FOUND);

      await expect(
        createDataSrc().createJob({
          queue: mockQueueName,
          data,
          options,
        })
      ).resolves.toEqual(true);
      expect(mockQueue.add).toHaveBeenCalledWith(null, data, options);
      mockQueue.add.mockClear();

      await expect(
        createDataSrc().createJob({
          queue: mockQueueName,
        })
      ).resolves.toEqual(true);
      expect(mockQueue.add).toHaveBeenCalledWith(null, {}, {});

      await expect(
        createDataSrc().createJob({
          queue: mockQueueName,
          data: 'str',
        })
      ).resolves.toEqual(true);
      expect(mockQueue.add).toHaveBeenCalledWith(null, 'str', {});
    });
    it('should remove jobs by pattern', async () => {
      const pattern = '*';
      await expect(
        createDataSrc().removeJobsByPattern({ queue: mockQueueName, pattern })
      ).resolves.toEqual(true);
      expect(mockQueue.removeJobs).toHaveBeenCalledWith(pattern);

      await expect(
        createDataSrc().removeJobsByPattern({ queue: none, pattern })
      ).rejects.toThrow(ErrorEnum.QUEUE_NOT_FOUND);
    });
    it('should pause queue', async () => {
      await expect(createDataSrc().pauseQueue(mockQueueName)).resolves.toEqual(
        mockQueue
      );
      expect(mockQueue.pause).toHaveBeenCalled;

      await expect(createDataSrc().pauseQueue(none)).rejects.toThrow(
        ErrorEnum.QUEUE_NOT_FOUND
      );
    });
    it('should clean queue', async () => {
      await expect(
        createDataSrc().cleanQueue({
          queue: mockQueueName,
          status: JobStatusClean.Active,
          grace: 1000,
          limit: 1,
        })
      ).resolves.toEqual([mockJobId]);
      expect(mockQueue.clean).toHaveBeenCalledWith(
        1000,
        JobStatusClean.Active,
        1
      );
      mockQueue.clean.mockClear();

      await expect(
        createDataSrc().cleanQueue({
          queue: mockQueueName,
          status: JobStatusClean.Active,
          grace: 1000,
        })
      ).resolves.toEqual([mockJobId]);
      expect(mockQueue.clean).toHaveBeenCalledWith(
        1000,
        JobStatusClean.Active,
        undefined
      );

      await expect(
        createDataSrc().cleanQueue({
          queue: none,
          status: JobStatusClean.Active,
          grace: 1000,
        })
      ).rejects.toThrow(ErrorEnum.QUEUE_NOT_FOUND);
    });
    it('should close queue', async () => {
      await expect(
        createDataSrc().closeQueue({
          queue: mockQueueName,
        })
      ).resolves.toEqual(mockQueue);
      expect(mockQueue.close).toHaveBeenCalled;

      await expect(
        createDataSrc().closeQueue({
          queue: none,
        })
      ).rejects.toThrow(ErrorEnum.QUEUE_NOT_FOUND);
    });
    it('should resume queue', async () => {
      await expect(
        createDataSrc().resumeQueue({
          queue: mockQueueName,
        })
      ).resolves.toEqual(mockQueue);
      expect(mockQueue.resume).toHaveBeenCalled;

      await expect(
        createDataSrc().resumeQueue({
          queue: none,
        })
      ).rejects.toThrow(ErrorEnum.QUEUE_NOT_FOUND);
    });
    it('should promote job', async () => {
      await expect(
        createDataSrc().promoteJob({
          queue: mockQueueName,
          id: mockJobId,
        })
      ).resolves.toEqual(mockJob);
      expect(mockJob.promote).toHaveBeenCalled;

      await expect(
        createDataSrc().promoteJob({
          queue: mockQueueName,
          id: none,
        })
      ).rejects.toThrow(ErrorEnum.JOB_NOT_FOUND);

      await expect(
        createDataSrc().promoteJob({
          queue: none,
          id: mockJobId,
        })
      ).rejects.toThrow(ErrorEnum.QUEUE_NOT_FOUND);
    });
    it('should discard job', async () => {
      await expect(
        createDataSrc().discardJob({
          queue: mockQueueName,
          id: mockJobId,
        })
      ).resolves.toEqual(mockJob);
      expect(mockJob.discard).toHaveBeenCalled;

      await expect(
        createDataSrc().discardJob({
          queue: mockQueueName,
          id: none,
        })
      ).rejects.toThrow(ErrorEnum.JOB_NOT_FOUND);

      await expect(
        createDataSrc().discardJob({
          queue: none,
          id: mockJobId,
        })
      ).rejects.toThrow(ErrorEnum.QUEUE_NOT_FOUND);
    });
    it('should update job data', async () => {
      const data = { key: 'value ' };
      await expect(
        createDataSrc().updateJobData({
          queue: mockQueueName,
          id: mockJobId,
          data: JSON.stringify(data),
        })
      ).resolves.toEqual(mockJob);
      expect(mockJob.update).toHaveBeenCalledWith(data);
      jest.clearAllMocks();
      await expect(
        createDataSrc().updateJobData({
          queue: mockQueueName,
          id: mockJobId,
          data,
        })
      ).resolves.toEqual(mockJob);
      expect(mockJob.update).toHaveBeenCalledWith(data);

      await expect(
        createDataSrc().updateJobData({
          queue: mockQueueName,
          id: none,
          data: JSON.stringify(data),
        })
      ).rejects.toThrow(ErrorEnum.JOB_NOT_FOUND);

      await expect(
        createDataSrc().updateJobData({
          queue: none,
          id: mockJobId,
          data: JSON.stringify(data),
        })
      ).rejects.toThrow(ErrorEnum.QUEUE_NOT_FOUND);
    });
    it('should create job log', async () => {
      const log = 'log';
      await expect(
        createDataSrc().createJobLog({
          queue: mockQueueName,
          id: mockJobId,
          row: log,
        })
      ).resolves.toEqual(mockJob);
      expect(mockJob.log).toHaveBeenCalledWith(log);

      await expect(
        createDataSrc().createJobLog({
          queue: mockQueueName,
          id: none,
          row: log,
        })
      ).rejects.toThrow(ErrorEnum.JOB_NOT_FOUND);

      await expect(
        createDataSrc().createJobLog({
          queue: none,
          id: mockJobId,
          row: log,
        })
      ).rejects.toThrow(ErrorEnum.QUEUE_NOT_FOUND);
    });
    it('should retry job', async () => {
      await expect(
        createDataSrc().retryJob({
          queue: mockQueueName,
          id: mockJobId,
        })
      ).resolves.toEqual(mockJob);
      expect(mockJob.retry).toHaveBeenCalled;

      await expect(
        createDataSrc().retryJob({
          queue: mockQueueName,
          id: none,
        })
      ).rejects.toThrow(ErrorEnum.JOB_NOT_FOUND);

      await expect(
        createDataSrc().retryJob({
          queue: none,
          id: mockJobId,
        })
      ).rejects.toThrow(ErrorEnum.QUEUE_NOT_FOUND);
    });
    it('should remove job by id', async () => {
      await expect(
        createDataSrc().removeJobById({
          queue: mockQueueName,
          id: mockJobId,
        })
      ).resolves.toEqual(mockJob);
      expect(mockJob.remove).toHaveBeenCalled;

      await expect(
        createDataSrc().removeJobById({
          queue: mockQueueName,
          id: none,
        })
      ).rejects.toThrow(ErrorEnum.JOB_NOT_FOUND);

      await expect(
        createDataSrc().removeJobById({
          queue: none,
          id: mockJobId,
        })
      ).rejects.toThrow(ErrorEnum.QUEUE_NOT_FOUND);
    });
    it('should move job to completed', async () => {
      await expect(
        createDataSrc().moveJobToCompleted({
          queue: mockQueueName,
          id: mockJobId,
        })
      ).resolves.toEqual(mockJob);
      expect(mockJob.moveToCompleted).toHaveBeenCalled;

      await expect(
        createDataSrc().moveJobToCompleted({
          queue: mockQueueName,
          id: none,
        })
      ).rejects.toThrow(ErrorEnum.JOB_NOT_FOUND);

      await expect(
        createDataSrc().moveJobToCompleted({
          queue: none,
          id: mockJobId,
        })
      ).rejects.toThrow(ErrorEnum.QUEUE_NOT_FOUND);
    });
    it('should move job to failed', async () => {
      await expect(
        createDataSrc().moveJobToFailed({
          queue: mockQueueName,
          id: mockJobId,
        })
      ).resolves.toEqual(mockJob);
      expect(mockJob.moveToFailed).toHaveBeenCalledWith({
        message: '',
      });

      await expect(
        createDataSrc().moveJobToFailed({
          queue: mockQueueName,
          id: none,
        })
      ).rejects.toThrow(ErrorEnum.JOB_NOT_FOUND);

      await expect(
        createDataSrc().moveJobToFailed({
          queue: none,
          id: mockJobId,
        })
      ).rejects.toThrow(ErrorEnum.QUEUE_NOT_FOUND);
    });
  });
});
