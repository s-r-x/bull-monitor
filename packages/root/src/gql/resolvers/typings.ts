import type { IResolvers } from '@graphql-tools/utils';
import type {
  BullDataSource,
  MetricsDataSource,
  PoliciesDataSource,
} from '../data-sources';

type DataSources = {
  dataSources: {
    bull: BullDataSource;
    metrics: MetricsDataSource;
    policies: PoliciesDataSource;
  };
};
export type TResolvers = IResolvers<any, DataSources>;
