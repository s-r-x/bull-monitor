import React from 'react';
import TableCell from '@mui/material/TableCell';
import MuiTableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import { useSelectedJobsStore } from '@/stores/selected-jobs';
import shallow from 'zustand/shallow';
import type { GetJobsQuery } from '@/typings/gql';
import isempty from 'lodash/isEmpty';

const actionsWidth = '172';
type TProps = {
  jobs?: GetJobsQuery['jobs'];
};
export default function TableHead({ jobs }: TProps) {
  const [selected, clearSelected, setSelected] = useSelectedJobsStore(
    (state) => [state.selected, state.clear, state.setJobs],
    shallow
  );
  const hasJobs = !isempty(jobs);
  const jobsLength = jobs?.length ?? 0;
  const isIndeterminate = selected.size > 0 && selected.size !== jobsLength;
  const isChecked = hasJobs && selected.size === jobsLength;
  const onChange = (_e: any, checked: boolean) => {
    if (checked) {
      if (jobs && hasJobs) {
        setSelected(jobs?.map((job) => job.id));
      }
    } else {
      clearSelected();
    }
  };
  return (
    <MuiTableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={isIndeterminate}
            checked={isChecked}
            onChange={onChange}
          />
        </TableCell>
        <TableCell
          style={{
            minWidth: `${actionsWidth}px`,
          }}
          width={actionsWidth}
        >
          Actions
        </TableCell>
        <TableCell>ID</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Timestamp</TableCell>
        <TableCell>Delay</TableCell>
        <TableCell width="100">Time</TableCell>
        <TableCell width="100">Attempts</TableCell>
        <TableCell width="100">Progress</TableCell>
      </TableRow>
    </MuiTableHead>
  );
}
