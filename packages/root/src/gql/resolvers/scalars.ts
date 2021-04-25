import { GraphQLJSON } from 'graphql-scalars';
import type { TResolvers } from './typings';

export const scalarsResolver: TResolvers = {
  JSON: GraphQLJSON,
};
