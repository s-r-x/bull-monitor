import { useMutation } from 'react-query';
import type { MutationFunction } from 'react-query';
import { useToast } from '@/hooks/use-toast';
import { useConfirm, ConfirmError } from '@/hooks/use-confirm';
import type { ConfirmOptions } from 'material-ui-confirm';
import { useQueryClient } from 'react-query';
import { QueryKeysConfig } from '@/config/query-keys';
import { usePreferencesStore } from '@/stores/preferences';

export function useAbstractMutation<
  TData = unknown,
  TVariables = unknown
>(props: {
  confirm?: ConfirmOptions;
  mutation: MutationFunction<TData, TVariables>;
  onSuccess?: (data: TData, vars: TVariables) => void | Promise<void> | any;
  toast?: string;
  invalidateSharedQueries?: boolean;
}) {
  const confirmDangerousActions = usePreferencesStore(
    (state) => state.confirmDangerousActions
  );
  const confirm = useConfirm();
  const toast = useToast();
  const queryClient = useQueryClient();
  const mutation = useMutation<TData, any, TVariables>(props.mutation, {
    onSuccess(data, vars) {
      if (props.toast) {
        toast(props.toast, {
          variant: 'success',
          autoHideDuration: 2000,
        });
      }
      if (props.invalidateSharedQueries) {
        queryClient.invalidateQueries(QueryKeysConfig.jobsList);
        queryClient.invalidateQueries(QueryKeysConfig.queues);
      }
      if (props.onSuccess) {
        props.onSuccess(data, vars);
      }
    },
    async onMutate() {
      if (confirmDangerousActions && props.confirm) {
        return await confirm(props.confirm);
      }
    },
    onError(e) {
      if (!(e instanceof ConfirmError)) {
        toast('Error. Check console for details', {
          variant: 'error',
          autoHideDuration: 2000,
        });
      }
    },
  });
  return mutation;
}
