import { useJobStatusesPalette } from '@/components/JobStatusChip/hooks';
import React from 'react';
import * as Chart from 'recharts';
import type { JobStatus } from '@/typings/gql';

const margin = { top: 0, left: 0, right: 5, bottom: 0 };
const style: React.CSSProperties = {
  pointerEvents: 'none',
};
type TProps = {
  count: { status: JobStatus; count: number }[];
};
export default function QueueStatusesPie(props: TProps) {
  const palette = useJobStatusesPalette();
  return (
    <Chart.PieChart style={style} margin={margin} width={50} height={50}>
      <Chart.Pie
        isAnimationActive={false}
        labelLine={false}
        data={props.count}
        dataKey="count"
      >
        {props.count.map((d, idx) => (
          <Chart.Cell key={idx} fill={palette[d.status]} />
        ))}
      </Chart.Pie>
    </Chart.PieChart>
  );
}
