import { makeStyles } from '@material-ui/core/styles';
import green from '@material-ui/core/colors/green';
import red from '@material-ui/core/colors/red';
import blue from '@material-ui/core/colors/blue';

export const useChartStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    paddingLeft: 0,
    overflow: 'hidden',
    flex: 1,
    [theme.breakpoints.down('xs')]: {
      display: 'block',
      height: 400,
    },
  },
  tooltipLabel: {
    color: 'black',
  },
}));

export const processingTimePalette = {
  min: green[400],
  max: red[400],
  avg: blue[400],
};
