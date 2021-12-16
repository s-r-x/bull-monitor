import React, { useCallback } from 'react';
import TextField from '@mui/material/TextField';
import { useQueuesFilterStore } from '@/stores/queues-filter';

type TProps = {
  className?: string;
};
export default function DrawerQueuesFilter(props: TProps) {
  const { name, changeName } = useQueuesFilterStore();
  const onChange: React.ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      changeName(e.target.value);
    },
    []
  );

  return (
    <TextField
      className={props.className}
      onChange={onChange}
      value={name}
      id="queues-filter-name"
      label="Filter"
      size="small"
      variant="outlined"
    />
  );
}
