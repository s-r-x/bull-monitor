import React from 'react';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import { useQueueCounts } from './hooks';
import TextField from '@material-ui/core/TextField';
import shallow from 'zustand/shallow';
import MenuItem from '@material-ui/core/MenuItem';
import { useFiltersStore } from '@/stores/filters';
import { OrderEnum } from '@/typings/gql';

const useStyles = makeStyles((theme) => ({
  root: {
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1),
  },
  statuses: {
    display: 'flex',
    justifyContent: 'flex-start',
    maxWidth: '100%',
    overflowX: 'auto',
    flexWrap: 'nowrap',
    marginBottom: theme.spacing(1),
    '-webkit-overflow-scrolling': 'touch',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
  count: {
    width: 'auto !important',
    backgroundColor: 'transparent !important',
    display: 'flex',
    alignItems: 'center',
  },
  statusesTip: {
    display: 'inline-flex',
    marginBottom: theme.spacing(1),
  },
  textFields: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    '& > *': {
      marginRight: theme.spacing(1),
    },
  },
}));

export default function JobsFilters() {
  const cls = useStyles();
  const [jobId, changeJobId, order, changeOrder] = useFiltersStore(
    (state) => [state.jobId, state.changeJobId, state.order, state.changeOrder],
    shallow,
  );
  const counts = useQueueCounts();

  return (
    <Paper className={cls.root}>
      <div className={cls.statuses}>
        {counts.map(({ value, label, isActive, onClick }, idx) => (
          <Chip
            classes={{
              avatar: cls.count,
            }}
            avatar={<div>{value}</div>}
            key={idx}
            onClick={onClick}
            color={isActive ? 'primary' : 'default'}
            label={label}
          />
        ))}
      </div>
      <div className={cls.textFields}>
        <TextField
          value={jobId}
          onChange={(e) => changeJobId(e.target.value)}
          label="Job ID"
          variant="outlined"
          id="jobs-filters_id"
          size="small"
        />
        <TextField
          variant="outlined"
          size="small"
          value={order}
          onChange={(e) => {
            changeOrder(e.target.value as OrderEnum);
          }}
          select
          label="Order"
          id="jobs-filters_order"
        >
          <MenuItem value={OrderEnum.Desc}>DESC</MenuItem>
          <MenuItem value={OrderEnum.Asc}>ASC</MenuItem>
        </TextField>
      </div>
    </Paper>
  );
}
