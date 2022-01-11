import React from 'react';
import type { JobStatus } from '@/typings/gql';
import JobStatusChip from '@/components/JobStatusChip';
import makeStyles from '@mui/styles/makeStyles';
import StatusesIndicator from './QueueStatusesIndicator';

const useStyles = makeStyles({
  root: {
    position: 'relative',
  },
  list: {
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
  count: { status: JobStatus; count: number }[];
};
export default function QueueJobsCount(props: TProps) {
  const cls = useStyles();
  return (
    <div className={cls.root}>
      <ul className={cls.list}>
        {props.count.map(({ status, count }, idx) => (
          <li data-status={status} key={idx} title={status}>
            <JobStatusChip size="small" status={status} label={count} />
          </li>
        ))}
      </ul>
      <StatusesIndicator count={props.count} />
    </div>
  );
}
