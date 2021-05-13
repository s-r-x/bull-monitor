import React from 'react';
import { useFormatDateTime } from '@/hooks/use-format-date-time';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Actions from './Actions';
import type { TJobProps } from './typings';
import Chip from '@material-ui/core/Chip';
import { useJobStatusColor } from './hooks';

const Job = ({ job, queue }: TJobProps) => {
  const date = useFormatDateTime(job.timestamp);
  const delayDate = useFormatDateTime(
    job.delay ? job.timestamp + job.delay : null,
  );
  const statusColor = useJobStatusColor(job.status);

  return (
    <>
      <TableRow>
        <TableCell>
          <Actions job={job} queue={queue} />
        </TableCell>
        <TableCell>{job.id}</TableCell>
        <TableCell>
          <Chip
            style={{
              backgroundColor: statusColor,
              color: '#fff',
            }}
            label={job.status}
          />
        </TableCell>
        <TableCell>{job.name}</TableCell>
        <TableCell>{date}</TableCell>
        <TableCell>{delayDate}</TableCell>
        <TableCell>{job.attemptsMade}</TableCell>
        <TableCell>{job.progress}</TableCell>
      </TableRow>
    </>
  );
};
export default React.memo(Job);
