import makeStyles from '@mui/styles/makeStyles';
import { green, red, blue } from '@mui/material/colors';

export const useChartStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(1),
    paddingLeft: 0,
    overflow: 'hidden',
    flex: 1,
    [theme.breakpoints.down('md')]: {
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
