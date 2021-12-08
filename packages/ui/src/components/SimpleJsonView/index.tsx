import React from 'react';
import makeStyles from '@mui/styles/makeStyles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#282C34',
    padding: theme.spacing(1),
    color: '#fff',
    maxHeight: '200px',
    overflowY: 'auto',
    margin: 0,
  },
}));

type TProps = {
  className?: string;
};
const SimpleJsonView: React.FC<TProps> = (props) => {
  const cls = useStyles();
  return (
    <pre className={clsx([cls.root, props.className])}>{props.children}</pre>
  );
};
export default SimpleJsonView;
