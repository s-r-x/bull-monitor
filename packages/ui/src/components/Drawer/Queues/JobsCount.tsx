import React from 'react';
import type { JobStatus } from '@/typings/gql';
import JobStatusChip from '@/components/JobStatusChip';
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
  count: { status: JobStatus; count: number }[];
};
export default function QueueJobsCount(props: TProps) {
  const cls = useStyles();
  return (
    <ul className={cls.root}>
      {props.count.map(({ status, count }, idx) => (
        <li key={idx} title={status}>
          <JobStatusChip size="small" status={status} label={count} />
        </li>
      ))}
    </ul>
  );
}
