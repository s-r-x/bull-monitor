import React from 'react';
import type { QueueJobsCounts } from '@/typings/gql';
import JobStatusChip from '@/components/JobStatusChip';
import { useJobsCountArray } from './hooks';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    alignItems: 'center',
    listStyleType: 'none',
    padding: 0,
    '& li': {
      margin: '0 2px 2px 0',
      '& div': {
        cursor: 'pointer',
      },
    },
  },
});
type TProps = {
  jobsCounts: QueueJobsCounts;
};
export default function QueueJobsCount(props: TProps) {
  const jobsCount = useJobsCountArray(props.jobsCounts);
  const cls = useStyles();
  return (
    <ul className={cls.root}>
      {jobsCount.map(({ status, count }, idx) => (
        <li key={idx} title={status}>
          <JobStatusChip size="small" status={status} label={count} />
        </li>
      ))}
    </ul>
  );
}
