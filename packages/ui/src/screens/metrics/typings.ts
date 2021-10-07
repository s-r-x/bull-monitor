import type { GetQueueMetricsQuery } from '@/typings/gql';

type TMetrics = NonNullable<GetQueueMetricsQuery['metrics']>;
export type TChartProps = {
  metrics: TMetrics;
};
