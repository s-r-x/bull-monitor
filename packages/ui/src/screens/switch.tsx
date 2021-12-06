import { useActiveScreenStore } from '@/stores/active-screen';
import React from 'react';
import JobsScreen from './jobs';
import MetricsScreen from './metrics';

const ScreensSwitch = () => {
  const screen = useActiveScreenStore((state) => state.screen);
  switch (screen) {
    case 'jobs':
      return <JobsScreen />;
    case 'metrics':
      return <MetricsScreen />;
    default:
      return null;
  }
};

export default ScreensSwitch;
