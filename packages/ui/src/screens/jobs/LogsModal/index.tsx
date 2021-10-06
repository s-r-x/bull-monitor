import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import shallow from 'zustand/shallow';
import { useQuery } from 'react-query';
import { QueryKeysConfig } from '@/config/query-keys';
import { useJobLogsStore } from '@/stores/job-logs';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { useNetwork } from '@/hooks/use-network';
import { useAbstractMutation } from '@/hooks/use-abstract-mutation';
import NetworkRequest from '@/components/NetworkRequest';
import { makeStyles } from '@material-ui/core/styles';

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
      position: 'relative',
      top: '10px',
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
        <form onSubmit={onSubmit} autoComplete="off">
          <div className={cls.inputRoot}>
            <TextField
              fullWidth
              value={log}
              onChange={(e) => setLog(e.target.value)}
              required
              id="job-log-input"
              label="Log"
            />
            <Button type="submit">submit</Button>
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
