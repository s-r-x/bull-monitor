import { JobStatus } from '@/typings/gql';
import { useTheme } from '@material-ui/core/styles';

export const useJobStatusColor = (status: JobStatus): string => {
  const theme = useTheme();
  if (status === JobStatus.Failed) {
    return theme.palette.error.main;
  } else if (status === JobStatus.Completed) {
    return theme.palette.success.main;
  } else if (status === JobStatus.Delayed) {
    return theme.palette.info.main;
  } else {
    return theme.palette.primary.main;
  }
};
