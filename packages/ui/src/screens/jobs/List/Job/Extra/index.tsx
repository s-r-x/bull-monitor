import React from 'react';
import type { TJobProps } from '../typings';
import Box from '@material-ui/core/Box';
import Options from './Options';
import Timeline from './Timeline';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'flex-start',
  },
  main: {
    flex: 1,
  },
}));
export default function JobExtra(props: TJobProps) {
  const cls = useStyles();
  return (
    <Box className={cls.root} marginY={1}>
      <Timeline job={props.job} />
      <Box className={cls.main}>
        <Options options={props.job.opts} />
      </Box>
    </Box>
  );
}
