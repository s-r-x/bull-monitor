import React, { memo, useMemo } from 'react';
import Paper from '@material-ui/core/Paper';
import * as Chart from 'recharts';
import { useCallback } from 'react';
import ms from 'ms';
import Alert from '@material-ui/lab/Alert';
import isempty from 'lodash/isEmpty';
import type { TChartProps } from '../typings';
import { useChartStyles } from './styles';
import { tickXFormatter, tooltipLabelFormatter } from './utils';

const ProcessingTimeChart = ({ metrics: rawMetrics }: TChartProps) => {
  const cls = useChartStyles();
  const metrics = useMemo(() => {
    return rawMetrics.filter((metric) => !!metric.processingTime);
  }, [rawMetrics]);
  const tooltipValueFormatter = useCallback((v: number) => ms(v), []);
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
            name="Processing time"
            type="monotone"
            dataKey="processingTime"
          />
        </Chart.LineChart>
      </Chart.ResponsiveContainer>
    </Paper>
  );
};

export default memo(ProcessingTimeChart);
