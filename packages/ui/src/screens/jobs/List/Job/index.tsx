import React from 'react';
import { useFormatDateTime } from '@/hooks/use-format-date-time';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import Actions from './Actions';
import type { TJobProps } from './typings';
import Checkbox from '@material-ui/core/Checkbox';
import JobStatusChip from '@/components/JobStatusChip';
import SimpleJsonView from '@/components/SimpleJsonView';
import isempty from 'lodash/isEmpty';
import { makeStyles } from '@material-ui/core/styles';
import { useRemoveJobSelectionOnUnmount } from './hooks';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  rowWithExtra: {
    '& td': {
      borderBottom: 'none',
    },
  },
  extraCell: {
    paddingTop: 0,
  },
  extra: {
    display: 'flex',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
    },
  },
  json: {
    flex: 1,
    '&:nth-child(2)': {
      marginLeft: theme.spacing(1),
      marginTop: 0,
      [theme.breakpoints.down('md')]: {
        marginLeft: 0,
        marginTop: theme.spacing(1),
      },
    },
  },
  stacktrace: {
    backgroundColor: theme.palette.error.main,
  },
}));
const Job = ({
  job,
  queue,
  isSelected,
  toggleSelected,
  removeSelected,
}: TJobProps) => {
  const date = useFormatDateTime(job.timestamp);
  const cls = useStyles();
  useRemoveJobSelectionOnUnmount(job.id, isSelected, removeSelected);
  const delayDate = useFormatDateTime(
    job.delay ? job.timestamp + job.delay : null,
  );
  const hasData = !!job.data && job.data !== '{}';
  const hasStacktrace = !isempty(job.stacktrace);
  const showExtra = hasData || hasStacktrace;
  return (
    <>
      <TableRow className={showExtra ? cls.rowWithExtra : undefined}>
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
      {showExtra && (
        <TableRow>
          <TableCell className={cls.extraCell} colSpan={12}>
            <div className={cls.extra}>
              {hasData && (
                <SimpleJsonView className={cls.json}>{job.data}</SimpleJsonView>
              )}
              {!isempty(job.stacktrace) && (
                <SimpleJsonView className={clsx(cls.json, cls.stacktrace)}>
                  {job.stacktrace.join('\n\n')}
                </SimpleJsonView>
              )}
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};
export default React.memo(Job);
