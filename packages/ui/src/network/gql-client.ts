import { GqlConfig } from '@/config/gql';
import { GraphQLClient } from 'graphql-request';

export const gqlClient = new GraphQLClient(GqlConfig.endpoint);
