import React from 'react';
import { useActiveQueueStore } from '@/stores/active-queue';
import Job from './Job';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';
import Pagination from './Pagination';
import DataEditor from './DataEditor';
import JobLogsModal from './Logs';
import { useJobsQuery } from './hooks';
import NetworkRequest from '@/components/NetworkRequest';
import TableHead from './Head';

export default function Jobs() {
  const queue = useActiveQueueStore((state) => state.active as string);
  const { data, status, refetch } = useJobsQuery();
  return (
    <Paper>
      <NetworkRequest status={status} refetch={refetch}>
        <TableContainer>
          <Table size="medium">
            <TableHead />
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
