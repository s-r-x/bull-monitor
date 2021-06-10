import { addWorkspaceAtom, workspacesSizeAtom } from '@/atoms/workspaces';
import { useQueuesQuery } from '@/hooks/use-queues-query';
import { useAtomValue, useUpdateAtom } from 'jotai/utils';
import { useEffect } from 'react';
export const useCreateFirstWorkspace = () => {
  const workspacesSize = useAtomValue(workspacesSizeAtom);
  const addWorkspace = useUpdateAtom(addWorkspaceAtom);
  const { data } = useQueuesQuery();
  const firstQueueName = data?.queues?.[0]?.name;
  useEffect(() => {
    if (!workspacesSize && firstQueueName) {
      addWorkspace({ queue: firstQueueName });
    }
  }, [firstQueueName, workspacesSize]);
};
