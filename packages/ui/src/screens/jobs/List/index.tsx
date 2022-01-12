import React from 'react';
import Job from './Job';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import Paper from '@mui/material/Paper';
import Pagination from './Pagination';
import DataEditor from '../DataEditorModal';
import JobLogsModal from '../LogsModal';
import { useJobsQuery } from './hooks';
import NetworkRequest from '@/components/NetworkRequest';
import TableHead from './Head';
import TableToolbar from './Toolbar';
import { useSelectedJobsStore } from '@/stores/selected-jobs';
import shallow from 'zustand/shallow';
import { useAtomValue } from 'jotai/utils';
import { activeQueueAtom } from '@/atoms/workspaces';
import { useQueueData } from '@/hooks/use-queue-data';

export default function Jobs() {
  const queue = useAtomValue(activeQueueAtom) as string;
  const { data, status, refetch, error } = useJobsQuery();
  const [selectedJobs, toggleSelected, removeSelected] = useSelectedJobsStore(
    (state) => [state.selected, state.toggleJob, state.removeJob],
    shallow
  );
  const readonly = !!useQueueData(queue)?.readonly;
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
                  readonly={readonly}
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
