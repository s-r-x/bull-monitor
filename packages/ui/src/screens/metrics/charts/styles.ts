import { makeStyles } from '@material-ui/core/styles';

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
