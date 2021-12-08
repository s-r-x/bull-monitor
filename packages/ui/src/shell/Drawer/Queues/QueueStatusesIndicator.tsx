import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import type { JobStatus } from '@/typings/gql';
import { useJobStatusesPalette } from '@/components/JobStatusChip/hooks';
import { MathUtils } from '@/services/math-utils';
import sum from 'lodash/sum';
import { useMemo } from 'react';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    height: 3,
    overflow: 'hidden',
    marginTop: theme.spacing(0.5),
  },
}));

type TProps = {
  count: { status: JobStatus; count: number }[];
};
export default function QueueStatusesIndicator({ count }: TProps) {
  const cls = useStyles();
  const palette = useJobStatusesPalette();
  const mapped = useMemo(() => {
    const allJobsCount = sum(count.map(({ count }) => count));
    if (!allJobsCount) return null;
    return count.map(({ count, status }) => ({
      width: MathUtils.mapNumberToPercent(count, 0, allJobsCount) + '%',
      color: palette[status],
    }));
  }, [palette, count]);
  if (!mapped) return null;
  return (
    <div className={cls.root}>
      {mapped.map(({ width, color }, idx) => (
        <div style={{ width, backgroundColor: color }} key={idx} />
      ))}
    </div>
  );
}
