import React, { useMemo, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Chip from '@material-ui/core/Chip';
import { makeStyles } from '@material-ui/core/styles';
import { useQueueCounts } from './hooks';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useFiltersStore } from '@/stores/filters';
import { OrderEnum } from '@/typings/gql';
import CloseableTip from '@/components/CloseableTip';
import debounce from 'lodash/debounce';

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
  searchTip: {
    marginBottom: theme.spacing(1),
  },
  textFields: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
    '& > *': {
      marginRight: theme.spacing(1),
    },
    '&:last-child': {
      marginBottom: 0,
    },
  },
}));

const SEARCH_INPUT_DEBOUNCE = 250;
export default function JobsFilters() {
  const cls = useStyles();
  const {
    jobId,
    changeJobId,
    order,
    changeOrder,
    changeDataSearchKey,
    changeDataSearchTerm,
  } = useFiltersStore();
  const counts = useQueueCounts();
  const [searchKey, setSearchKey] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const onDataSearchKeyChange: React.ChangeEventHandler<HTMLInputElement> = useMemo(() => {
    const debounced = debounce(
      (v: string) => changeDataSearchKey(v),
      SEARCH_INPUT_DEBOUNCE,
    );
    return ({ target: { value } }) => {
      setSearchKey(value);
      debounced(value);
    };
  }, []);
  const onDataSearchTermChange: React.ChangeEventHandler<HTMLInputElement> = useMemo(() => {
    const debounced = debounce(
      (v: string) => changeDataSearchTerm(v),
      SEARCH_INPUT_DEBOUNCE,
    );
    return ({ target: { value } }) => {
      setSearchTerm(value);
      debounced(value);
    };
  }, []);

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
      <CloseableTip
        className={cls.searchTip}
        persistKey="data-text-search"
        tip="Any key supported by lodash.get. If not specified text search will be performed on the whole stringified data"
      />
      <div className={cls.textFields}>
        <TextField
          value={searchKey}
          onChange={onDataSearchKeyChange}
          label="Data search key"
          variant="outlined"
          id="jobs-filters_data-search-key"
          size="small"
        />
        <TextField
          value={searchTerm}
          onChange={onDataSearchTermChange}
          variant="outlined"
          size="small"
          label="Data search term"
          id="jobs-filters_data-search-term"
        />
      </div>
    </Paper>
  );
}
