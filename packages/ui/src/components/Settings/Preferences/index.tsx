import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FormControl from '@material-ui/core/FormControl';
import { usePreferencesStore } from '@/stores/preferences';

export default function Preferences() {
  const {
    confirmDangerousActions,
    toggleConfirmDangerousActions,
    groupQueuesByPrefix,
    toggleGroupQueuesByPrefix,
  } = usePreferencesStore();
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
      <FormControl margin="dense">
        <FormControlLabel
          control={
            <Switch
              checked={groupQueuesByPrefix}
              onChange={toggleGroupQueuesByPrefix}
            />
          }
          label="Group queues by prefix"
        />
      </FormControl>
    </div>
  );
}
