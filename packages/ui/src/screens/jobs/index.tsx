import React, { memo } from 'react';
import Filters from './Filters';
import List from './List';
import CreateJobModal from './CreateJob';
import QueueActions from './QueueActions';
import Workspaces from './Workspaces';
import RemoveJobsModal from './RemoveJobs';
import { useAtomValue } from 'jotai/utils';
import { activeQueueAtom } from '@/atoms/workspaces';

const JobsScreen = () => {
  const queue = useAtomValue(activeQueueAtom);
  if (!queue) return null;
  return (
    <>
      <Workspaces />
      <Filters />
      <QueueActions />
      <List />
      <CreateJobModal />
      <RemoveJobsModal />
    </>
  );
};

export default memo(JobsScreen);
