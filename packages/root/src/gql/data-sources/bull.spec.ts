import { BullDataSource, ErrorEnum } from './bull';
import type { Queue, Job } from 'bull';
import { JobStatus, OrderEnum } from '../../typings/gql';

const mockJobId = 'id';
const mockQueueName = 'q';
const none = 'none';
const mockJob = {
  id: mockJobId,
} as Job;
const mockQueue = {
  name: mockQueueName,
  getJob: jest.fn().mockImplementation((id: any) => {
    if (id === mockJobId) {
      return mockJob;
    }
    return null;
  }),
  getJobs: jest.fn().mockImplementation(() => {
    return [mockJob];
  }),
  getCompletedCount: jest.fn().mockImplementation(() => Promise.resolve(1)),
  getFailedCount: jest.fn().mockImplementation(() => Promise.resolve(2)),
  getDelayedCount: jest.fn().mockImplementation(() => Promise.resolve(3)),
  getActiveCount: jest.fn().mockImplementation(() => Promise.resolve(4)),
  getWaitingCount: jest.fn().mockImplementation(() => Promise.resolve(5)),
  getPausedCount: jest.fn().mockImplementation(() => Promise.resolve(6)),
  count: jest.fn().mockImplementation(() => Promise.resolve(7)),
};
const createDataSrc = () =>
  new BullDataSource([(mockQueue as unknown) as Queue]);

afterEach(() => {
  jest.clearAllMocks();
});
describe('bull data source', () => {
  // TODO:: job logs
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
});
