import type { GetQueueMetricsQuery } from '@/typings/gql';
import type { Maybe } from '@/typings/utils';
import range from 'lodash/range';
import random from 'lodash/random';

const genCount = () => random(0, 50);
const genMetrics = (): GetQueueMetricsQuery => {
  const now = Date.now();
  const metrics: GetQueueMetricsQuery['metrics'] = range(25).map((n) => ({
    timestamp: now + n * 100000,
    queue: 'lul',
    counts: {
      waiting: genCount(),
      completed: genCount(),
      failed: genCount(),
      paused: 0,
      active: genCount(),
      delayed: genCount(),
    },
  }));
  return { metrics };
};
let metrics: Maybe<GetQueueMetricsQuery> = null;
export const getQueueMetricsMock = async (): Promise<GetQueueMetricsQuery> => {
  if (!metrics) {
    metrics = genMetrics();
    return metrics;
  } else {
    return metrics;
  }
};
