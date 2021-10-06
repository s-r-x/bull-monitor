import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
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

const DataEditor = () => {
  const queryClient = useQueryClient();

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
      <DialogContent>
        <NetworkRequest status={status} refetch={refetch}>
          <CodeEditor onChange={setData} value={data} />
        </NetworkRequest>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={onSubmit}>Submit</Button>
      </DialogActions>
    </>
  );
};
export default function DataEditorModal() {
  const [isOpen, onClose] = useDataEditorStore(
    (state) => [state.isOpen, state.close],
    shallow
  );
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DataEditor />
    </Dialog>
  );
}
