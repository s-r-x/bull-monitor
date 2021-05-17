import React from 'react';
import { QueuesQueryContext } from '@/providers/queues-query';

export const useQueuesQuery = () => React.useContext(QueuesQueryContext);
