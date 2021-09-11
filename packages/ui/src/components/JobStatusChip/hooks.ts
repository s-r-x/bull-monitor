import { JobStatus } from '@/typings/gql';
import deepPurple from '@material-ui/core/colors/deepPurple';
import grey from '@material-ui/core/colors/grey';
import cyan from '@material-ui/core/colors/cyan';
import red from '@material-ui/core/colors/red';
import green from '@material-ui/core/colors/green';
import blue from '@material-ui/core/colors/blue';

const palette: Record<JobStatus, string> = {
  [JobStatus.Failed]: red[500],
  [JobStatus.Completed]: green[500],
  [JobStatus.Delayed]: blue[800],
  [JobStatus.Waiting]: deepPurple[500],
  [JobStatus.Paused]: grey[600],
  [JobStatus.Active]: cyan[500],
  [JobStatus.Stuck]: grey[400],
};
export const useJobStatusesPalette = () => palette;
export const useJobStatusColor = (status: JobStatus): string => {
  return palette[status];
};
