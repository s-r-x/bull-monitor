import React from 'react';
import Chip from '@material-ui/core/Chip';
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
  const style = {
    color: '#fff',
    backgroundColor,
  };
  if (isUndefined(props.label) || props.label <= 0) {
    style.opacity = 0.5;
  }
  return (
    <Chip
      style={style}
      size={props.size}
      className={props.className}
      label={isUndefined(props.label) ? props.status : props.label}
    />
  );
}
