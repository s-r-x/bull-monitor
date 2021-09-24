import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import Button from '@material-ui/core/Button';
import shallow from 'zustand/shallow';
import CodeEditor from '@/components/CodeEditor';
import { useNetwork } from '@/hooks/use-network';
import { useAbstractMutation } from '@/hooks/use-abstract-mutation';
import { useCreateJobStore } from '@/stores/create-job';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import { activeQueueAtom } from '@/atoms/workspaces';
import { useAtomValue } from 'jotai/utils';

const useStyles = makeStyles((theme) => ({
  label: {
    marginBottom: theme.spacing(1),
  },
  formControl: {
    marginBottom: theme.spacing(2),
  },
  form: {
    width: '100%',
  },
}));

const CreateJob = () => {
  const classes = useStyles();
  const queue = useAtomValue(activeQueueAtom) as string;

  const {
    mutations: { createJob },
  } = useNetwork();
  const [
    close,
    data,
    changeData,
    options,
    changeOptions,
    closeAndClearInput,
    name,
    changeName,
  ] = useCreateJobStore(
    (state) => [
      state.close,
      state.data,
      state.changeData,
      state.options,
      state.changeOptions,
      state.closeAndClearInput,
      state.name,
      state.changeName,
    ],
    shallow
  );
  const mutation = useAbstractMutation({
    mutation: createJob,
    toast: 'Job has been created',
    onSuccess: closeAndClearInput,
    invalidateSharedQueries: true,
  });
  const onSubmit: React.FormEventHandler = (e) => {
    e.preventDefault();
    mutation.mutate({
      input: {
        queue,
        data,
        name,
        options,
      },
    });
  };
  return (
    <>
      <DialogContent>
        <form onSubmit={onSubmit} id="create-job_form" className={classes.form}>
          <TextField
            fullWidth
            variant="outlined"
            value={name}
            onChange={(e) => changeName(e.target.value)}
            id="create-job_name"
            label="Name"
            className={classes.formControl}
          />
          <FormControl className={classes.formControl} fullWidth>
            <FormLabel className={classes.label}>Data</FormLabel>
            <CodeEditor value={data} onChange={changeData} />
          </FormControl>
          <FormControl className={classes.formControl} fullWidth>
            <FormLabel className={classes.label}>Options</FormLabel>
            <CodeEditor value={options} onChange={changeOptions} />
          </FormControl>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={close}>Cancel</Button>
        <Button
          disabled={mutation.isLoading}
          type="submit"
          form="create-job_form"
        >
          Submit
        </Button>
      </DialogActions>
    </>
  );
};
export default function CreateJobModal() {
  const [isOpen, onClose] = useCreateJobStore(
    (state) => [state.isOpen, state.close],
    shallow
  );
  return (
    <Dialog open={isOpen} onClose={onClose}>
      <CreateJob />
    </Dialog>
  );
}
