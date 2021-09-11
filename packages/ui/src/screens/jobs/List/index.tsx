import React from 'react';
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
import TableToolbar from './Toolbar';
import { useSelectedJobsStore } from '@/stores/selected-jobs';
import shallow from 'zustand/shallow';
import { useAtomValue } from 'jotai/utils';
import { activeQueueAtom } from '@/atoms/workspaces';

export default function Jobs() {
  const queue = useAtomValue(activeQueueAtom) as string;
  const { data, status, refetch, error } = useJobsQuery();
  const [selectedJobs, toggleSelected, removeSelected] = useSelectedJobsStore(
    (state) => [state.selected, state.toggleJob, state.removeJob],
    shallow
  );
  return (
    <Paper>
      <NetworkRequest status={status} refetch={refetch} error={error}>
        <TableToolbar />
        <TableContainer>
          <Table size="medium">
            <TableHead jobs={data?.jobs} />
            <TableBody>
              {data?.jobs?.map((job) => (
                <Job
                  toggleSelected={toggleSelected}
                  removeSelected={removeSelected}
                  isSelected={selectedJobs.has(job.id)}
                  queue={queue}
                  key={job.id}
                  job={job}
                />
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
