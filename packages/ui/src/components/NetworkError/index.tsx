import React from 'react';
import Alert from '@mui/material/Alert';
import Button from '@mui/material/Button';

type TProps = {
  refetch: () => any;
  message?: string;
};
const DEFAULT_MESSAGE = 'There was an error during request.';
export default function NetworkError({
  refetch,
  message = DEFAULT_MESSAGE,
}: TProps) {
  return (
    <Alert
      severity="error"
      action={
        <Button onClick={() => refetch()} color="inherit" size="small">
          Refetch
        </Button>
      }
    >
      {message}
    </Alert>
  );
}
