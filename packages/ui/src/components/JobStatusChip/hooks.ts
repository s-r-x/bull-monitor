import { JobStatus } from '@/typings/gql';
import { useTheme } from '@material-ui/core/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';
import grey from '@material-ui/core/colors/grey';
import cyan from '@material-ui/core/colors/cyan';
import { useMemo } from 'react';

export const useJobStatusesPalette = () => {
  const theme = useTheme();
  return useMemo(() => {
    const mapping: Record<JobStatus, string> = {
      [JobStatus.Failed]: theme.palette.error.main,
      [JobStatus.Completed]: theme.palette.success.main,
      [JobStatus.Delayed]: theme.palette.info.main,
      [JobStatus.Waiting]: deepPurple[500],
      [JobStatus.Paused]: grey[600],
      [JobStatus.Active]: cyan[700],
      [JobStatus.Stuck]: grey[400],
    };
    return mapping;
  }, [theme]);
};
export const useJobStatusColor = (status: JobStatus): string => {
  const theme = useTheme();
  switch (status) {
    case JobStatus.Failed:
      return theme.palette.error.main;
    case JobStatus.Completed:
      return theme.palette.success.main;
    case JobStatus.Delayed:
      return theme.palette.info.main;
    case JobStatus.Waiting:
      return deepPurple[500];
    case JobStatus.Paused:
      return grey[600];
    case JobStatus.Active:
      return cyan[700];
    default:
      return theme.palette.primary.main;
  }
};
