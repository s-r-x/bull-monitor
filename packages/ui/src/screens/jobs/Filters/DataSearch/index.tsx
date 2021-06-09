import React, { memo } from 'react';
import TextField from '@material-ui/core/TextField';
import CloseableTip from '@/components/CloseableTip';
import { makeStyles } from '@material-ui/core/styles';
import BackspaceIcon from '@material-ui/icons/Backspace';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import { useDataSearchState } from './hooks';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  searchTip: {
    marginBottom: theme.spacing(1),
  },
  textFields: {
    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    '& > *': {
      marginRight: theme.spacing(1),
    },
    '&:last-child': {
      marginBottom: 0,
    },
  },
}));

const DataSearch = () => {
  const {
    key,
    term,
    onClear,
    onKeyChange,
    onTermChange,
  } = useDataSearchState();
  const cls = useStyles();

  return (
    <>
      <CloseableTip
        className={cls.searchTip}
        persistKey="data-text-search"
        tip='Search inside your data by any key supported by lodash.get. {"user": {"profile": {"name": "vasya"}}} -> user.profile.name. If key is not specified text search will be performed on the whole stringified data.'
      />
      <div className={cls.root}>
        <div className={cls.textFields}>
          <TextField
            value={key}
            onChange={onKeyChange}
            label="Data search key"
            variant="outlined"
            id="jobs-filters_data-search-key"
            autoComplete="off"
            size="small"
          />
          <TextField
            value={term}
            onChange={onTermChange}
            autoComplete="off"
            variant="outlined"
            size="small"
            label="Data search term"
            id="jobs-filters_data-search-term"
          />
        </div>
        <Tooltip title="Clear">
          <IconButton onClick={onClear} size="medium">
            <BackspaceIcon />
          </IconButton>
        </Tooltip>
      </div>
    </>
  );
};
export default memo(DataSearch);
