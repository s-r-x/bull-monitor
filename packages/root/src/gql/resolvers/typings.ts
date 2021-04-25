import type { IResolvers } from 'graphql-tools';
import { BullDataSource } from '../data-sources';

type DataSources = {
  dataSources: {
    bull: BullDataSource;
  };
};
export type TResolvers = IResolvers<any, DataSources>;
