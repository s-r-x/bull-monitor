import React from 'react';
import Toolbar from '@mui/material/Toolbar';
import { useSelectedJobsStore } from '@/stores/selected-jobs';
import QueueActions from '../QueueActions';
import SelectedJobsActions from '../SelectedJobsActions';

export default function TableToolbar() {
  const selectedCount = useSelectedJobsStore((state) => state.selected).size;
  return (
    <Toolbar>
      {selectedCount > 0 ? <SelectedJobsActions /> : <QueueActions />}
    </Toolbar>
  );
}
