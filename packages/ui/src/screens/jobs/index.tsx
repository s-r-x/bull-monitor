import React, { memo } from 'react';
import Filters from './Filters';
import List from './List';
import CreateJobModal from './CreateJob';
import QueueActions from './QueueActions';
import RemoveJobsModal from './RemoveJobs';

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
