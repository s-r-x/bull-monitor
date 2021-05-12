import React from 'react';
import { useFormatDateTime } from '@/hooks/use-format-date-time';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Actions from './Actions';
import type { TJobProps } from './typings';
import Collapse from '@material-ui/core/Collapse';
import { makeStyles } from '@material-ui/core/styles';
import JobExtra from './Extra';
import { usePreferencesStore } from '@/stores/preferences';
import Chip from '@material-ui/core/Chip';
import { useJobStatusColor } from './hooks';

const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
  cellCollapse: {
    position: 'relative',
    zIndex: 1,
    paddingBottom: 0,
    paddingTop: 0,
  },
});

const Job = ({ job, queue }: TJobProps) => {
  const date = useFormatDateTime(job.timestamp);
  const delayDate = useFormatDateTime(
    job.delay ? job.timestamp + job.delay : null,
  );
  const defaultExpanded = usePreferencesStore((state) => state.expandRows);
  const [expanded, setExpanded] = React.useState(defaultExpanded);
  const classes = useRowStyles();
  const statusColor = useJobStatusColor(job.status);

  return (
    <>
      <TableRow className={classes.root}>
        <TableCell>
          <Actions
            expanded={expanded}
            toggleExpanded={() => setExpanded(!expanded)}
            job={job}
            queue={queue}
          />
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
      <TableRow>
        <TableCell className={classes.cellCollapse} colSpan={12}>
          <Collapse in={expanded} timeout="auto" unmountOnExit>
            <JobExtra job={job} queue={queue} />
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
};
export default React.memo(Job);
