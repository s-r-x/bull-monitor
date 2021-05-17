import React from 'react';
import { useFormatDateTime } from '@/hooks/use-format-date-time';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Actions from './Actions';
import type { TJobProps } from './typings';
import Checkbox from '@material-ui/core/Checkbox';
import JobStatusChip from '@/components/JobStatusChip';

const Job = ({ job, queue, isSelected, toggleSelected }: TJobProps) => {
  const date = useFormatDateTime(job.timestamp);
  const delayDate = useFormatDateTime(
    job.delay ? job.timestamp + job.delay : null,
  );
  return (
    <TableRow>
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
  );
};
export default React.memo(Job);
