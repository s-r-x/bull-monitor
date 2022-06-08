import { useGqlClient } from '@/network/gql-client';
import React from 'react';
import { networkContextValue } from './value';

export const NetworkContext = React.createContext<any>(null);

export const NetworkProvider: React.FC = (props) => {
  const gqlClient = useGqlClient();

  return (
    <NetworkContext.Provider value={networkContextValue(gqlClient)}>
      {props.children}
    </NetworkContext.Provider>
  );
};
