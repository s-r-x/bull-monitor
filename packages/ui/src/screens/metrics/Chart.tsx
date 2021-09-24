import React, { memo } from 'react';
import Paper from '@material-ui/core/Paper';
import * as Chart from 'recharts';
import { makeStyles } from '@material-ui/core/styles';
import { JobStatus } from '@/typings/gql';
import type { GetQueueMetricsQuery } from '@/typings/gql';
import { useJobStatusesPalette } from '@/components/JobStatusChip/hooks';
import day from 'dayjs';
import { useCallback } from 'react';

const DATE_FORMAT = 'YYYY-MM-DD HH:mm';
const statuses = Object.values(JobStatus).filter(
  (status) => status !== JobStatus.Stuck
);
const tickXFormatter = (timestamp: number) => {
  return day(timestamp).format(DATE_FORMAT);
};
const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    overflow: 'hidden',
    flex: 1,
  },
  tooltipLabel: {
    color: 'black',
  },
}));

type TMetrics = NonNullable<GetQueueMetricsQuery['metrics']>;
type TProps = {
  metrics: TMetrics;
};
const MetricsChart = ({ metrics }: TProps) => {
  const cls = useStyles();
  const tooltipLabelFormatter = useCallback((label: number) => {
    return day(label).format(DATE_FORMAT);
  }, []);
  const palette = useJobStatusesPalette();
  return (
    <Paper className={cls.root}>
      <Chart.ResponsiveContainer width="100%" height="100%">
        <Chart.LineChart
          data={metrics}
          margin={{
            top: 5,
            right: 30,
            left: 0,
            bottom: 5,
          }}
        >
          <Chart.XAxis
            interval="preserveStartEnd"
            tick={{
              fontSize: 14,
            }}
            dataKey="timestamp"
            tickLine={false}
            dy={7}
            tickFormatter={tickXFormatter}
          />
          <Chart.YAxis
            tick={{
              fontSize: 14,
            }}
            tickLine={false}
          />
          <Chart.Tooltip
            labelClassName={cls.tooltipLabel}
            labelFormatter={tooltipLabelFormatter}
          />
          <Chart.Legend />
          {statuses.map((status) => (
            <Chart.Line
              key={status}
              strokeWidth={2}
              isAnimationActive={false}
              name={status}
              //dot={false}
              type="monotone"
              stroke={palette[status]}
              dataKey={`counts.${status}`}
            />
          ))}
        </Chart.LineChart>
      </Chart.ResponsiveContainer>
    </Paper>
  );
};

export default memo(MetricsChart);
