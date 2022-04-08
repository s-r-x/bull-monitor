import React, { memo } from 'react';
import TextField from '@mui/material/TextField';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import BackspaceIcon from '@mui/icons-material/Backspace';
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
      label="Search"
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
