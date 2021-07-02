import { useActiveScreenStore } from '@/stores/active-screen';
import React from 'react';
import JobsScreen from './jobs';
import MetricsScreen from './metrics';
import WorkspacePicker from './WorkspacePicker';
import { useAtomValue } from 'jotai/utils';
import { activeQueueAtom } from '@/atoms/workspaces';

const ScreensSwitch = () => {
  const screen = useActiveScreenStore((state) => state.screen);
  const activeQueue = useAtomValue(activeQueueAtom);
  if (!activeQueue) return null;
  return (
    <>
      <WorkspacePicker />
      {screen === 'jobs' && <JobsScreen />}
      {screen === 'metrics' && <MetricsScreen />}
    </>
  );
};

export default ScreensSwitch;
