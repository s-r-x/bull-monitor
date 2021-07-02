import type { IResolvers } from 'graphql-tools';
import { BullDataSource, MetricsDataSource } from '../data-sources';

type DataSources = {
  dataSources: {
    bull: BullDataSource;
    metrics: MetricsDataSource;
  };
};
export type TResolvers = IResolvers<any, DataSources>;
