import React from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import FormControl from '@mui/material/FormControl';
import { usePreferencesStore } from '@/stores/preferences';

export default function Preferences() {
  const {
    confirmDangerousActions,
    toggleConfirmDangerousActions,
    groupQueuesByPrefix,
    toggleGroupQueuesByPrefix,
    expandJobData,
    expandJobStackTrace,
    expandJobReturnValue,
    toggleExpandJobData,
    toggleExpandJobStackTrace,
    toggleExpandJobReturnValue,
  } = usePreferencesStore();
  return (
    <>
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
      <div>
        <FormControl margin="dense">
          <FormControlLabel
            control={
              <Switch checked={expandJobData} onChange={toggleExpandJobData} />
            }
            label="Expand job's data by default"
          />
        </FormControl>
        <FormControl margin="dense">
          <FormControlLabel
            control={
              <Switch
                checked={expandJobReturnValue}
                onChange={toggleExpandJobReturnValue}
              />
            }
            label="Expand job's return value by default"
          />
        </FormControl>
        <FormControl margin="dense">
          <FormControlLabel
            control={
              <Switch
                checked={expandJobStackTrace}
                onChange={toggleExpandJobStackTrace}
              />
            }
            label="Expand job's stacktrace return value by default"
          />
        </FormControl>
      </div>
    </>
  );
}
