import { JobStatus } from '@/typings/gql';
import { useTheme } from '@material-ui/core/styles';
import deepPurple from '@material-ui/core/colors/deepPurple';
import grey from '@material-ui/core/colors/grey';
import cyan from '@material-ui/core/colors/cyan';

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
