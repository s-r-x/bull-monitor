import React, { memo } from 'react';
import TextField from '@material-ui/core/TextField';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import BackspaceIcon from '@material-ui/icons/Backspace';
import { useDataSearchState } from './hooks';

type TProps = {
  className?: string;
};
const DataSearch = ({ className }: TProps) => {
  const { search, onChange, onClear } = useDataSearchState();

  return (
    <TextField
      className={className}
      value={search}
      onChange={onChange}
      label="Data search"
      variant="outlined"
      id="jobs-filters_data-search-key"
      autoComplete="off"
      size="small"
      InputProps={{
        endAdornment: (
          <Tooltip title="Clear">
            <IconButton onClick={onClear} size="small">
              <BackspaceIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        ),
      }}
    />
  );
};
export default memo(DataSearch);
