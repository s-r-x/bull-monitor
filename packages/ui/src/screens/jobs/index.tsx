import React, { memo } from 'react';
import Filters from './Filters';
import List from './List';
import CreateJobModal from './CreateJobModal';
import QueueActions from './QueueActions';
import RemoveJobsModal from './RemoveJobsModal';

const JobsScreen = () => {
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
