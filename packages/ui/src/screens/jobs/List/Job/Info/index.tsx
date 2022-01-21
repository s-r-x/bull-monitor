import React from 'react';
import type { TJobProps } from '../typings';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Typography from '@mui/material/Typography';
import { useFormatDateTime } from '@/hooks/use-format-date-time';
import { JobStatus } from '@/typings/gql';
import { useActiveStep } from './hooks';
import makeStyles from '@mui/styles/makeStyles';
import Box from '@mui/material/Box';
import SimpleJsonView from '@/components/SimpleJsonView';

const useStyles = makeStyles((theme) => ({
  root: {
    overflowX: 'auto',
  },
  stepper: {
    padding: 0,
    whiteSpace: 'nowrap',
  },
  text: {
    marginTop: theme.spacing(2),
    maxWidth: '800px',
  },
}));
type TProps = Pick<TJobProps, 'job'>;
export default function JobInfo({ job }: TProps) {
  const cls = useStyles();
  const queueDate = useFormatDateTime(job.timestamp);
  const processDate = useFormatDateTime(job.processedOn);
  const delay = job.delay;
  const delayTimestamp = job.timestamp && delay ? job.timestamp + delay : null;
  const delayDate = useFormatDateTime(delayTimestamp);
  const finishDate = useFormatDateTime(job.finishedOn);
  const activeStep = useActiveStep({ job, delayTimestamp });
  const isFailed = job.status === JobStatus.Failed;
  const returnData = isFailed ? job.failedReason : job.returnValue;
  return (
    <Box className={cls.root} p={1}>
      <Stepper
        orientation="horizontal"
        className={cls.stepper}
        activeStep={activeStep}
      >
        <Step>
          <StepLabel>
            <Typography variant="button">Queued</Typography>
            <Typography variant="body2">{queueDate}</Typography>
          </StepLabel>
        </Step>
        {delayDate && (
          <Step>
            <StepLabel>
              <Typography variant="button">Delayed</Typography>
              <Typography variant="body2">{delayDate}</Typography>
            </StepLabel>
          </Step>
        )}
        <Step>
          <StepLabel>
            <Typography variant="button">Processed</Typography>
            {processDate && (
              <Typography variant="body2">{processDate}</Typography>
            )}
          </StepLabel>
        </Step>
        <Step>
          <StepLabel error={isFailed}>
            <Typography variant="button">
              {isFailed ? 'Failed' : 'Finished'}
            </Typography>
            {finishDate && (
              <Typography variant="body2">{finishDate}</Typography>
            )}
          </StepLabel>
        </Step>
      </Stepper>
      {returnData && (
        <SimpleJsonView className={cls.text}>{returnData}</SimpleJsonView>
      )}
      {job.opts && (
        <SimpleJsonView className={cls.text}>{job.opts}</SimpleJsonView>
      )}
    </Box>
  );
}
