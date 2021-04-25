import { NetworkContext } from '@/providers/network';
import React from 'react';

export const useNetwork = () => React.useContext(NetworkContext);
