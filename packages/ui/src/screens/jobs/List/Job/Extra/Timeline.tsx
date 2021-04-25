import React from 'react';
import type { TJobProps } from '../typings';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Typography from '@material-ui/core/Typography';
import { useFormatDateTime } from '@/hooks/use-format-date-time';
import { JobStatus } from '@/typings/gql';
import { useActiveStep } from './hooks';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 0,
    width: 225,
    overflow: 'hidden',
    marginRight: theme.spacing(1),
  },
}));
type TProps = Pick<TJobProps, 'job'>;
export default function Timeline({ job }: TProps) {
  const cls = useStyles();
  const queueDate = useFormatDateTime(job.timestamp);
  const processDate = useFormatDateTime(job.processedOn);
  const delay = job.delay;
  const delayTimestamp = delay ? job.timestamp + delay : null;
  const delayDate = useFormatDateTime(delayTimestamp);
  const finishDate = useFormatDateTime(job.finishedOn);
  const activeStep = useActiveStep({ job, delayTimestamp });
  const isFailed = job.status === JobStatus.Failed;
  return (
    <Stepper
      orientation="vertical"
      className={cls.root}
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
          {finishDate && <Typography variant="body2">{finishDate}</Typography>}
          {isFailed ? (
            <Typography variant="caption">{job.failedReason}</Typography>
          ) : (
            <Typography variant="caption">{job.returnValue}</Typography>
          )}
        </StepLabel>
      </Step>
    </Stepper>
  );
}
