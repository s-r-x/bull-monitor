import React from 'react';
import TextField from '@material-ui/core/TextField';
import shallow from 'zustand/shallow';
import MenuItem from '@material-ui/core/MenuItem';
import { useNetworkSettingsStore } from '@/stores/network-settings';
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
  const [pollingInterval, changePollingInterval] = useNetworkSettingsStore(
    (state) => [state.pollingInterval, state.changePollingInterval],
    shallow,
  );
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
    </div>
  );
}
