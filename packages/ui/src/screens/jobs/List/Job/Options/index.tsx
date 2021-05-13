import CodeEditor from '@/components/CodeEditor';
import React from 'react';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: '320px',
    '& .CodeMirror': {
      height: '200px',
    },
  },
}));

type TProps = {
  options?: string;
};
export default function Options(props: TProps) {
  const cls = useStyles();
  return (
    <Box className={cls.root} p={1}>
      <CodeEditor value={props.options} readOnly />
    </Box>
  );
}
