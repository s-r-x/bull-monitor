import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import type { CircularProgressProps } from '@material-ui/core/CircularProgress';

type TProps = CircularProgressProps & {
  centered: boolean;
};
export default function Spin({ centered, ...props }: TProps) {
  if (centered) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          margin: '20px 0',
        }}
      >
        <CircularProgress {...props} />
      </div>
    );
  }
  return <CircularProgress {...props} />;
}
