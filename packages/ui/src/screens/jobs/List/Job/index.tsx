import React from 'react';
import { useFormatDateTime } from '@/hooks/use-format-date-time';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Actions from './Actions';
import type { TJobProps } from './typings';
import Checkbox from '@material-ui/core/Checkbox';
import JobStatusChip from '@/components/JobStatusChip';
import SimpleJsonView from '@/components/SimpleJsonView';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  rowWithData: {
    '& td': {
      borderBottom: 'none',
    },
  },
  dataCell: {
    paddingTop: 0,
  },
});
const Job = ({ job, queue, isSelected, toggleSelected }: TJobProps) => {
  const date = useFormatDateTime(job.timestamp);
  const cls = useStyles();
  const delayDate = useFormatDateTime(
    job.delay ? job.timestamp + job.delay : null,
  );
  const hasData = !!job.data;
  return (
    <>
      <TableRow className={hasData ? cls.rowWithData : undefined}>
        <TableCell padding="checkbox">
          <Checkbox
            onChange={() => toggleSelected(job.id)}
            checked={isSelected}
          />
        </TableCell>
        <TableCell>
          <Actions job={job} queue={queue} />
        </TableCell>
        <TableCell>{job.id}</TableCell>
        <TableCell>
          <JobStatusChip status={job.status} />
        </TableCell>
        <TableCell>{job.name}</TableCell>
        <TableCell>{date}</TableCell>
        <TableCell>{delayDate}</TableCell>
        <TableCell>{job.attemptsMade}</TableCell>
        <TableCell>{job.progress}</TableCell>
      </TableRow>
      {hasData && (
        <TableRow>
          <TableCell className={cls.dataCell} colSpan={12}>
            <SimpleJsonView>{job.data}</SimpleJsonView>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};
export default React.memo(Job);
