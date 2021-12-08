import React from 'react';
import Paper from '@mui/material/Paper';
import Chip from '@mui/material/Chip';
import makeStyles from '@mui/styles/makeStyles';
import { useQueueCounts } from './hooks';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { OrderEnum } from '@/typings/gql';
import { useAtom } from 'jotai';
import { jobIdAtom, jobsOrderAtom } from '@/atoms/workspaces';
import DataSearch from './DataSearch';
import DataSearchTip from './DataSearch/Tip';

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
  textFields: {
    display: 'flex',
    flexWrap: 'wrap',
    marginBottom: theme.spacing(1),
    '& > *': {
      marginRight: theme.spacing(1),
      marginTop: theme.spacing(1),
    },
  },
  sortField: {
    minWidth: '90px',
  },
  dataSearchField: {
    flex: 1,
    minWidth: '300px',
  },
  dataSearchTip: {
    marginBottom: theme.spacing(1),
  },
}));

export default function JobsFilters() {
  const cls = useStyles();
  const counts = useQueueCounts();
  const [jobId, changeJobId] = useAtom(jobIdAtom);
  const [order, changeOrder] = useAtom(jobsOrderAtom);
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
      <DataSearchTip className={cls.dataSearchTip} />
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
          className={cls.sortField}
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
        <DataSearch className={cls.dataSearchField} />
      </div>
    </Paper>
  );
}
