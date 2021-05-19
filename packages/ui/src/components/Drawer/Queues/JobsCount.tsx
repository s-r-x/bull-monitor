import React from 'react';
import type { QueueJobsCounts, JobStatus } from '@/typings/gql';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import JobStatusChip from '@/components/JobStatusChip';
import List from '@material-ui/core/List';
import { useJobsCountArray } from './hooks';

type TProps = {
  jobsCounts: QueueJobsCounts;
  activeStatus: JobStatus;
  isQueueSelected: boolean;
  onSelect: (status: JobStatus) => void;
};
export default function QueueJobsCount(props: TProps) {
  const jobsCount = useJobsCountArray(props.jobsCounts);
  return (
    <List disablePadding>
      {jobsCount.map(({ status, count }, idx) => (
        <ListItem
          onClick={() => props.onSelect(status)}
          selected={props.isQueueSelected && props.activeStatus === status}
          button
          key={idx}
          divider
          dense
        >
          <ListItemText primary={status} />
          <ListItemSecondaryAction>
            <JobStatusChip size="small" status={status} label={count} />
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
}
