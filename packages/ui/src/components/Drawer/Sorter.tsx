import React from 'react';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import {
  AVAILABLE_SORT_FIELDS,
  useQueuesSortStore,
} from '@/stores/queues-sort';
import IconButton from '@material-ui/core/IconButton';
import SortIcon from '@material-ui/icons/Sort';
import Tooltip from '@material-ui/core/Tooltip';

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
