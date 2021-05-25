import React from 'react';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import { useNetworkSettingsStore } from '@/stores/network-settings';
import Switch from '@material-ui/core/Switch';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import ms from 'ms';

const minute = 60000;
const AVAILABLE_POLLING_INTERVALS = [
  0,
  1000,
  3000,
  5000,
  10000,
  minute / 2,
  minute,
  minute * 10,
  minute * 30,
];
export default function NetworkSettings() {
  const {
    pollingInterval,
    changePollingInterval,
    shouldFetchData,
    toggleShouldFetchData,
  } = useNetworkSettingsStore();
  return (
    <div>
      <TextField
        variant="outlined"
        margin="normal"
        value={pollingInterval}
        onChange={(e) => changePollingInterval(Number(e.target.value))}
        fullWidth
        select
        id="network__polling-interval"
        label="Polling Interval"
      >
        {AVAILABLE_POLLING_INTERVALS.map((interval) => (
          <MenuItem key={interval} value={interval}>
            {interval ? ms(interval, { long: true }) : 'Disable'}
          </MenuItem>
        ))}
      </TextField>
      <FormControl margin="dense">
        <FormControlLabel
          control={
            <Switch
              checked={shouldFetchData}
              onChange={toggleShouldFetchData}
            />
          }
          label="Fetch and render data"
        />
      </FormControl>
    </div>
  );
}
