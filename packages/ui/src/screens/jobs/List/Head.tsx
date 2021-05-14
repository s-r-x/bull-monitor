import React from 'react';
import TableCell from '@material-ui/core/TableCell';
import MuiTableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

export default function TableHead() {
  return (
    <MuiTableHead>
      <TableRow>
        <TableCell
          style={{
            minWidth: '190px',
          }}
          width="190"
        >
          Actions
        </TableCell>
        <TableCell>ID</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>Name</TableCell>
        <TableCell>Timestamp</TableCell>
        <TableCell>Delay</TableCell>
        <TableCell width="100">Attempts</TableCell>
        <TableCell width="100">Progress</TableCell>
      </TableRow>
    </MuiTableHead>
  );
}
