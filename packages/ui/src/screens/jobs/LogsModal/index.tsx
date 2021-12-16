import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Button from '@mui/material/Button';
import shallow from 'zustand/shallow';
import { useQuery } from 'react-query';
import { QueryKeysConfig } from '@/config/query-keys';
import { useJobLogsStore } from '@/stores/job-logs';
import TextField from '@mui/material/TextField';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { useNetwork } from '@/hooks/use-network';
import { useAbstractMutation } from '@/hooks/use-abstract-mutation';
import NetworkRequest from '@/components/NetworkRequest';
import makeStyles from '@mui/styles/makeStyles';
import { useQueueData } from '@/hooks/use-queue-data';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    '@media(max-width: 540px)': {
      width: 'auto',
    },
  },
  inputRoot: {
    display: 'flex',
    alignItems: 'center',
    '& button': {
      marginLeft: theme.spacing(1),
    },
  },
}));

const JobLogs = () => {
  const [log, setLog] = React.useState('');
  const cls = useStyles();
  const {
    queries: { getJobLogs },
    mutations: { createJobLog },
  } = useNetwork();
  const [onClose, jobIdentity] = useJobLogsStore(
    (state) => [
      state.close,
      state.jobIdentity as NonNullable<typeof state.jobIdentity>,
    ],
    shallow
  );
  const readonly = !!useQueueData(jobIdentity.queue)?.readonly;
  const { status, refetch, data } = useQuery(
    [QueryKeysConfig.jobLogs, jobIdentity],
    () => getJobLogs(jobIdentity),
    {
      enabled: Boolean(jobIdentity),
    }
  );
  const mutation = useAbstractMutation({
    mutation: createJobLog,
    toast: 'Created',
    onSuccess: () => {
      refetch();
      setLog('');
    },
  });
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
    mutation.mutate({
      ...jobIdentity,
      row: log,
    });
  };
  return (
    <>
      <DialogContent className={cls.root}>
        <form aria-disabled={readonly} onSubmit={onSubmit} autoComplete="off">
          <div className={cls.inputRoot}>
            <TextField
              disabled={readonly}
              fullWidth
              value={log}
              onChange={(e) => setLog(e.target.value)}
              required
              id="job-log-input"
              label="Log"
            />
            <Button color="inherit" disabled={readonly} type="submit">
              submit
            </Button>
          </div>
        </form>
        <NetworkRequest status={status} refetch={refetch}>
          <List dense>
            {data?.job?.logs?.logs.map((log, idx) => (
              <ListItem divider={true} disableGutters key={idx}>
                <ListItemText primary={log} />
              </ListItem>
            ))}
          </List>
        </NetworkRequest>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </>
  );
};
export default function JobLogsModal() {
  const [isOpen, onClose] = useJobLogsStore(
    (state) => [state.isOpen, state.close],
    shallow
  );
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <JobLogs />
    </Dialog>
  );
}
