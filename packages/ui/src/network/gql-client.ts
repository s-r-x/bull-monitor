import { GqlConfig } from '@/config/gql';
import { GraphQLClient } from 'graphql-request';
import { useKeycloak } from '@react-keycloak/web';

export const useGqlClient = () => {
  const { keycloak, initialized } = useKeycloak();

  return new GraphQLClient(GqlConfig.endpoint, {
    headers: { authorization: `Bearer ${keycloak.token}` },
  });
};
