import React, { memo, useMemo } from 'react';
import Paper from '@mui/material/Paper';
import * as Chart from 'recharts';
import Alert from '@mui/material/Alert';
import isempty from 'lodash/isEmpty';
import type { TChartProps } from '../typings';
import { useChartStyles, processingTimePalette as palette } from './styles';
import {
  tickXFormatter,
  tooltipLabelFormatter,
  tooltipValueFormatter,
} from './utils';

const ProcessingTimeChart = ({ metrics: rawMetrics }: TChartProps) => {
  const cls = useChartStyles();
  const metrics = useMemo(() => {
    return rawMetrics.filter((metric) => !!metric.processingTime);
  }, [rawMetrics]);
  if (isempty(metrics)) {
    return <Alert severity="warning">No "processing time" metrics</Alert>;
  }
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
            formatter={tooltipValueFormatter}
          />
          <Chart.Legend />
          <Chart.Line
            strokeWidth={2}
            isAnimationActive={false}
            name="Processing time(min)"
            type="monotone"
            dataKey="processingTimeMin"
            stroke={palette.min}
          />
          <Chart.Line
            strokeWidth={2}
            isAnimationActive={false}
            name="Processing time(max)"
            type="monotone"
            dataKey="processingTimeMax"
            stroke={palette.max}
          />
          <Chart.Line
            strokeWidth={2}
            isAnimationActive={false}
            name="Processing time(avg)"
            type="monotone"
            dataKey="processingTime"
            stroke={palette.avg}
          />
        </Chart.LineChart>
      </Chart.ResponsiveContainer>
    </Paper>
  );
};

export default memo(ProcessingTimeChart);
