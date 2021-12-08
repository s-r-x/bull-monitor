import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import type { CircularProgressProps } from '@mui/material/CircularProgress';

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
