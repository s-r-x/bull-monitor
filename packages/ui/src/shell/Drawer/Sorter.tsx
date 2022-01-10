import React from 'react';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {
  AVAILABLE_SORT_FIELDS,
  useQueuesSortStore,
} from '@/stores/queues-sort';
import IconButton from '@mui/material/IconButton';
import SortIcon from '@mui/icons-material/Sort';
import Tooltip from '@mui/material/Tooltip';

type TProps = {
  className?: string;
};
export default function DrawerQueuesFilter(props: TProps) {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const { field: activeField, changeField } = useQueuesSortStore();
  const close = () => setAnchorEl(null);
  return (
    <>
      <Tooltip title="Sort">
        <IconButton
          aria-controls="queues-sort-menu"
          aria-haspopup="true"
          className={props.className}
          onClick={(e) => setAnchorEl(e.currentTarget)}
          size="large"
        >
          <SortIcon />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorEl}
        onClose={close}
        open={Boolean(anchorEl)}
        id="queues-sort-menu"
      >
        {AVAILABLE_SORT_FIELDS.map((field) => (
          <MenuItem
            selected={field === activeField}
            key={field}
            onClick={() => {
              changeField(field);
              close();
            }}
          >
            {field ? field + ' ⬇️' : 'none'}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
