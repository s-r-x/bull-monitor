import React from 'react';
import Dialog from '@mui/material/Dialog';
import Button from '@mui/material/Button';
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
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import makeStyles from '@mui/styles/makeStyles';

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  submitBtn: {
    marginLeft: theme.spacing(1),
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
            size="large"
          >
            <CloseIcon />
          </IconButton>
          <Button
            color="inherit"
            className={classes.submitBtn}
            onClick={onSubmit}
          >
            Update data
          </Button>
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
