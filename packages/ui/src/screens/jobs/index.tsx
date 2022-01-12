import React, { memo } from 'react';
import Filters from './Filters';
import List from './List';
import CreateJobModal from './CreateJobModal';
import RemoveJobsModal from './RemoveJobsModal';

const JobsScreen = () => {
  return (
    <>
      <Filters />
      <List />
      <CreateJobModal />
      <RemoveJobsModal />
    </>
  );
};

export default memo(JobsScreen);
