import React from 'react';
import Chip from '@mui/material/Chip';
import type { JobStatus } from '@/typings/gql';
import isUndefined from 'lodash/isUndefined';
import { useJobStatusColor } from './hooks';

type TProps = {
  status: JobStatus;
  label?: string | number;
  className?: string;
  size?: 'medium' | 'small';
};

export default function JobStatusChip(props: TProps) {
  const backgroundColor = useJobStatusColor(props.status);
  return (
    <Chip
      style={{
        color: '#fff',
        backgroundColor,
      }}
      size={props.size}
      className={props.className}
      label={isUndefined(props.label) ? props.status : props.label}
    />
  );
}
