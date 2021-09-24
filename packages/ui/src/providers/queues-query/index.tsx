import { QueryKeysConfig } from '@/config/query-keys';
import { useNetwork } from '@/hooks/use-network';
import type { GetQueuesQuery } from '@/typings/gql';
import React from 'react';
import { useQuery } from 'react-query';
import type { UseQueryResult } from 'react-query';
import { getPollingInterval } from '@/stores/network-settings';

type TValue = UseQueryResult<GetQueuesQuery, unknown>;
export const QueuesQueryContext = React.createContext<TValue>(null as any);
export const QueuesQueryProvider: React.FC = (props) => {
  const { queries } = useNetwork();
  const refetchInterval = getPollingInterval();
  const value = useQuery(QueryKeysConfig.queues, queries.getQueues, {
    refetchInterval,
  });
  return (
    <QueuesQueryContext.Provider value={value}>
      {props.children}
    </QueuesQueryContext.Provider>
  );
};
