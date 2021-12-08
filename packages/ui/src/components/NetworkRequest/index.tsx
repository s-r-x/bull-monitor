import React from 'react';
import Spin from '@/components/Spin';
import NetworkError from '@/components/NetworkError';
import type { QueryStatus } from 'react-query';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles({
  spin: {
    margin: '25px 0',
  },
});
type TProps = {
  refetch: () => any;
  status: QueryStatus;
  error?: any;
};
const extractErrorMessage = (e?: any) => {
  return e?.response?.errors?.[0]?.message;
};
const NetworkRequest: React.FC<TProps> = (props) => {
  const classes = useStyles();
  if (props.status === 'loading') {
    return <Spin centered className={classes.spin} />;
  } else if (props.status === 'error') {
    return (
      <NetworkError
        message={extractErrorMessage(props.error)}
        refetch={props.refetch}
      />
    );
  } else {
    return <>{props.children}</>;
  }
};
export default NetworkRequest;
