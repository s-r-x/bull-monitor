import React from 'react';
import shallow from 'zustand/shallow';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FormControl from '@material-ui/core/FormControl';
import { usePreferencesStore } from '@/stores/preferences';

export default function Preferences() {
  const [
    confirmDangerousActions,
    toggleConfirmDangerousActions,
  ] = usePreferencesStore(
    (state) => [
      state.confirmDangerousActions,
      state.toggleConfirmDangerousActions,
    ],
    shallow,
  );
  return (
    <div>
      <FormControl margin="dense">
        <FormControlLabel
          control={
            <Switch
              checked={confirmDangerousActions}
              onChange={toggleConfirmDangerousActions}
            />
          }
          label="Confirm dangerous actions"
        />
      </FormControl>
    </div>
  );
}
