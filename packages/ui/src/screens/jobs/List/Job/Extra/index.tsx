import React from 'react';
import type { TJobProps } from '../typings';
import Box from '@material-ui/core/Box';
import Options from './Options';

export default function JobExtra(props: TJobProps) {
  return (
    <Box marginY={1}>
      <Options options={props.job.opts} />
    </Box>
  );
}
