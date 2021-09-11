import React, { memo } from 'react';
import TextField from '@material-ui/core/TextField';
import CloseableTip from '@/components/CloseableTip';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import BackspaceIcon from '@material-ui/icons/Backspace';
import { makeStyles } from '@material-ui/core/styles';
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
  const { search, onChange, onClear } = useDataSearchState();
  const cls = useStyles();

  return (
    <>
      <CloseableTip
        className={cls.searchTip}
        persistKey="data-text-search-v2"
        tip='Data search is powered by jsonata(https://docs.jsonata.org/overview.html). Example query for data {"user": {"profile": {"name": "ilya", "age": 30}}} -> user.profile[name="ilya" and age>=30]'
      />
      <div className={cls.root}>
        <div className={cls.textFields}>
          <TextField
            value={search}
            onChange={onChange}
            label="Data search"
            variant="outlined"
            id="jobs-filters_data-search-key"
            autoComplete="off"
            size="small"
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
