import React from 'react';
import shallow from 'zustand/shallow';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FormControl from '@material-ui/core/FormControl';
import { usePreferencesStore } from '@/stores/preferences';

export default function Preferences() {
  const [expandRows, toggleExpandRows] = usePreferencesStore(
    (state) => [state.expandRows, state.toggleExpandRows],
    shallow,
  );
  return (
    <div>
      <FormControl margin="normal">
        <FormControlLabel
          control={<Switch checked={expandRows} onChange={toggleExpandRows} />}
          label="Expand rows by default"
        />
      </FormControl>
    </div>
  );
}
