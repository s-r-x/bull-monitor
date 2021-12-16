import CodeEditor from '@/components/CodeEditor';
import React from 'react';
import Box from '@mui/material/Box';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles({
  root: {
    minWidth: '320px',
    '& .CodeMirror': {
      height: '200px',
    },
  },
});

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
