import {
  activePageAtom,
  activeQueueAtom,
  activeQueueLabelAtom,
  activeStatusAtom,
  activeWorkspaceAtom,
  dataSearchAtom,
  jobIdAtom,
  jobsOrderAtom,
} from '@/atoms/workspaces';
import type { TAddWorkspaceDto } from '@/atoms/workspaces';
import { Base64 } from '@/services/base64';
import copyToClipboard from 'copy-to-clipboard';
import { useAtomCallback } from 'jotai/utils';
import type { Getter } from 'jotai';
import { useCallback } from 'react';
import qs from 'query-string';
import { ShareConfig } from '@/config/share';
import { useToast } from './use-toast';

export enum EShareStrategy {
  WORKSPACE,
  SINGLE_JOB,
}
type TShareDto =
  | [EShareStrategy.WORKSPACE]
  | [EShareStrategy.SINGLE_JOB, string];

export const useShareActiveWorkspace = () => {
  const share = useShare();
  return useCallback(() => {
    share([EShareStrategy.WORKSPACE]);
  }, [share]);
};
export const useShareJob = () => {
  const share = useShare();
  return useCallback(
    (jobId: string) => {
      share([EShareStrategy.SINGLE_JOB, jobId]);
    },
    [share]
  );
};
const useShare = () => {
  const toast = useToast();
  return useAtomCallback(
    useCallback((get, _set, dto: TShareDto) => {
      const ws = get(activeWorkspaceAtom);
      if (!ws) {
        return;
      }
      const token = Base64.encodeJSON(extractData(get, dto));
      const shareUrl = qs.stringifyUrl({
        url: window.location.href,
        query: {
          [ShareConfig.queryParamName]: token,
        },
      });
      copyToClipboard(shareUrl);
      toast('Copied to the clipboard', {
        variant: 'success',
        autoHideDuration: 1000,
      });
    }, [])
  );
};
const extractData = (get: Getter, dto: TShareDto): TAddWorkspaceDto => {
  const queue = get(activeQueueAtom) as string;
  const queueLabel = get(activeQueueLabelAtom) as string;
  switch (dto[0]) {
    case EShareStrategy.WORKSPACE:
      return {
        page: get(activePageAtom),
        queue,
        queueLabel,
        status: get(activeStatusAtom),
        order: get(jobsOrderAtom),
        jobId: get(jobIdAtom),
        dataSearch: get(dataSearchAtom),
      };
    case EShareStrategy.SINGLE_JOB:
      return {
        queue,
        queueLabel,
        jobId: dto[1],
        page: 0,
        status: get(activeStatusAtom),
      };
  }
};
