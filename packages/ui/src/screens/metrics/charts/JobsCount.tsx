import React, { memo } from 'react';
import Paper from '@mui/material/Paper';
import * as Chart from 'recharts';
import { JobStatus } from '@/typings/gql';
import { useJobStatusesPalette } from '@/components/JobStatusChip/hooks';
import type { TChartProps } from '../typings';
import { useChartStyles } from './styles';
import { tickXFormatter, tooltipLabelFormatter } from './utils';

const statuses = Object.values(JobStatus).filter(
  (status) => status !== JobStatus.Stuck
);

const JobsCountChart = ({ metrics }: TChartProps) => {
  const cls = useChartStyles();
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

export default memo(JobsCountChart);
