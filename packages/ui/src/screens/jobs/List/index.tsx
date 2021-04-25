import React from 'react';
import { useActiveQueueStore } from '@/stores/active-queue';
import Job from './Job';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Pagination from './Pagination';
import DataEditor from './DataEditor';
import JobLogsModal from './Logs';
import { useJobsQuery } from './hooks';
import NetworkRequest from '@/components/NetworkRequest';

export default function Jobs() {
  const queue = useActiveQueueStore((state) => state.active as string);
  const { data, status, refetch } = useJobsQuery();
  return (
    <Paper>
      <NetworkRequest status={status} refetch={refetch}>
        <TableContainer>
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    minWidth: '165px',
                  }}
                  width="165"
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
            </TableHead>
            <TableBody>
              {data?.jobs.map((job) => (
                <Job queue={queue} key={job.id} job={job} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination />
      </NetworkRequest>
      <DataEditor />
      <JobLogsModal />
    </Paper>
  );
}
