import React from 'react';
import Spin from '@/components/Spin';
import NetworkError from '@/components/NetworkError';
import type { QueryStatus } from 'react-query';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  spin: {
    margin: '25px 0',
  },
});
type TProps = {
  refetch: () => any;
  status: QueryStatus;
};
const NetworkRequest: React.FC<TProps> = (props) => {
  const classes = useStyles();
  if (props.status === 'loading') {
    return <Spin centered className={classes.spin} />;
  } else if (props.status === 'error') {
    return <NetworkError refetch={props.refetch} />;
  } else {
    return <>{props.children}</>;
  }
};
export default NetworkRequest;
