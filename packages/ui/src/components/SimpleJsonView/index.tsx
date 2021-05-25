import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: '#282C34',
    padding: theme.spacing(1),
    color: '#fff',
    height: '200px',
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
