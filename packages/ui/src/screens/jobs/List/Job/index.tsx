import React from 'react';
import { useFormatDateTime } from '@/hooks/use-format-date-time';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import Actions from './Actions';
import type { TJobProps } from './typings';
import Checkbox from '@mui/material/Checkbox';
import JobStatusChip from '@/components/JobStatusChip';
import isempty from 'lodash/isEmpty';
import makeStyles from '@mui/styles/makeStyles';
import { useRemoveJobSelectionOnUnmount } from './hooks';
import ms from 'ms';
import AccordionJsonView from '@/components/AccordionJsonView';
import { usePreferencesStore } from '@/stores/preferences';

const useStyles = makeStyles((theme) => ({
  rowWithExtra: {
    '& td': {
      borderBottom: 'none',
    },
  },
  extraCell: {
    paddingTop: 0,
  },
  extraOneCol: {
    display: 'grid',
    gridTemplateColumns: '1fr',
  },
  extraTwoCol: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridGap: theme.spacing(1),
    [theme.breakpoints.down('xl')]: {
      gridTemplateColumns: '1fr',
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
  readonly,
}: TJobProps) => {
  const prefs = usePreferencesStore();
  const date = useFormatDateTime(job.timestamp);
  const cls = useStyles();
  useRemoveJobSelectionOnUnmount(job.id, isSelected, removeSelected);
  const delayDate = useFormatDateTime(
    job.delay && job.timestamp ? job.timestamp + job.delay : null
  );
  const hasData = !!job.data && job.data !== '{}';
  const hasStacktrace = !isempty(job.stacktrace);
  const hasReturnValue = !isempty(job.returnValue);
  const showExtra = hasData || hasStacktrace || hasReturnValue;
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
          <Actions readonly={readonly} job={job} queue={queue} />
        </TableCell>
        <TableCell>{job.id}</TableCell>
        <TableCell>
          <JobStatusChip status={job.status} />
        </TableCell>
        <TableCell>{job.name}</TableCell>
        <TableCell>{date}</TableCell>
        <TableCell>{delayDate}</TableCell>
        <TableCell>
          {job.processingTime ? ms(job.processingTime) : null}
        </TableCell>
        <TableCell>{job.attemptsMade}</TableCell>
        <TableCell>{job.progress}</TableCell>
      </TableRow>
      {showExtra && (
        <TableRow>
          <TableCell className={cls.extraCell} colSpan={12}>
            <div
              className={
                [hasData, hasStacktrace, hasReturnValue].filter(Boolean)
                  .length > 1
                  ? cls.extraTwoCol
                  : cls.extraOneCol
              }
            >
              {hasData && (
                <AccordionJsonView
                  defaultExpanded={prefs.expandJobData}
                  header="Job Data"
                >
                  {job.data}
                </AccordionJsonView>
              )}
              {hasReturnValue && (
                <AccordionJsonView
                  defaultExpanded={prefs.expandJobReturnValue}
                  header="Return Value"
                >
                  {job.returnValue}
                </AccordionJsonView>
              )}
              {hasStacktrace && (
                <AccordionJsonView
                  defaultExpanded={prefs.expandJobStackTrace}
                  textClassName={cls.stacktrace}
                  header="Stacktrace"
                >
                  {job.stacktrace.join('\n\n')}
                </AccordionJsonView>
              )}
            </div>
          </TableCell>
        </TableRow>
      )}
    </>
  );
};
export default React.memo(Job);
