import React, { memo } from 'react';
import Filters from './Filters';
import List from './List';
import { useActiveQueueStore } from '@/stores/active-queue';
import CreateJobModal from './CreateJob';
import QueueActions from './QueueActions';
import RemoveJobsModal from './RemoveJobs';

const JobsScreen = () => {
  const queue = useActiveQueueStore((state) => state.active);
  if (!queue) {
    return null;
  }
  return (
    <>
      <Filters />
      <QueueActions />
      <List />
      <CreateJobModal />
      <RemoveJobsModal />
    </>
  );
};

export default memo(JobsScreen);
