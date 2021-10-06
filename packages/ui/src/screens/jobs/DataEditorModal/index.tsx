import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import { useDataEditorStore } from '@/stores/data-editor';
import shallow from 'zustand/shallow';
import { useQuery, useQueryClient } from 'react-query';
import { QueryKeysConfig } from '@/config/query-keys';
import CodeEditor from '@/components/CodeEditor';
import type { Maybe } from '@/typings/utils';
import { useNetwork } from '@/hooks/use-network';
import { useAbstractMutation } from '@/hooks/use-abstract-mutation';
import type { GetJobDataQuery } from '@/typings/gql';
import NetworkRequest from '@/components/NetworkRequest';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root: {
    padding: theme.spacing(2),
    paddingBottom: 0,
    '& .CodeMirror': {
      height: 'calc(100vh - 100px)',
    },
  },
}));

const DataEditor = () => {
  const queryClient = useQueryClient();
  const classes = useStyles();

  const [data, setData] = React.useState<Maybe<string> | undefined>();
  const {
    queries: { getJobData },
    mutations: { updateJobData },
  } = useNetwork();
  const [onClose, jobIdentity] = useDataEditorStore(
    (state) => [
      state.close,
      state.jobIdentity as NonNullable<typeof state.jobIdentity>,
    ],
    shallow
  );
  const queryKey = [QueryKeysConfig.jobData, jobIdentity];
  const { status, refetch } = useQuery(
    queryKey,
    () => getJobData(jobIdentity),
    {
      onSuccess: (data) => {
        setData(data.job?.data);
      },
      enabled: Boolean(jobIdentity),
    }
  );
  const mutation = useAbstractMutation({
    mutation: updateJobData,
    toast: 'Job data has been updated',
    onSuccess() {
      const newData: GetJobDataQuery = {
        job: { data },
      };
      queryClient.setQueryData(queryKey, newData);
      onClose();
    },
  });
  const onSubmit = () => {
    mutation.mutateAsync({
      ...jobIdentity,
      data,
    });
  };
  return (
    <>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            onClick={onClose}
            aria-label="close"
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            Edit data
          </Typography>
          <Button onClick={onSubmit}>Submit</Button>
        </Toolbar>
      </AppBar>
      <div className={classes.root}>
        <NetworkRequest status={status} refetch={refetch}>
          <CodeEditor onChange={setData} value={data} />
        </NetworkRequest>
      </div>
    </>
  );
};
export default function DataEditorModal() {
  const [isOpen, onClose] = useDataEditorStore(
    (state) => [state.isOpen, state.close],
    shallow
  );
  return (
    <Dialog fullScreen open={isOpen} onClose={onClose}>
      <DataEditor />
    </Dialog>
  );
}
