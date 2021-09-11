import { StorageConfig } from '@/config/storage';
import { JobStatus, OrderEnum } from '@/typings/gql';
import type { Maybe } from '@/typings/utils';
import { atom } from 'jotai';
import { v4 as uuidv4 } from 'uuid';
import isempty from 'lodash/isEmpty';
import pullAt from 'lodash/pullAt';
import { storageAtom } from './utils';
import { atomFamily, selectAtom } from 'jotai/utils';
import { WorkspacesConfig } from '@/config/workspaces';
import tail from 'lodash/tail';

export type TWorkspace = {
  id: string;
  page?: number;
  status?: JobStatus;
  jobId?: string;
  order?: OrderEnum;
  dataSearch?: string;
  queue: string;
  queueLabel: string;
};

export type TAddWorkspaceDto = Partial<Omit<TWorkspace, 'id'>>;
type TUpdateWorkspaceDto = TAddWorkspaceDto;

export const activeWorkspaceIdAtom = storageAtom<Maybe<string>>(
  `${StorageConfig.atomsPersistNs}wsIdV2`,
  null
);
export const workspacesListAtom = storageAtom<TWorkspace[]>(
  `${StorageConfig.atomsPersistNs}wsListV2`,
  []
);
export const workspacesSizeAtom = selectAtom(
  workspacesListAtom,
  (list) => list.length
);
const specificWorkspaceAtom = atomFamily((id: Maybe<string>) =>
  atom((get) => {
    const list = get(workspacesListAtom);
    if (!id) {
      return null;
    }
    if (!list) {
      return null;
    }
    return list.find((ws) => ws.id === id) || null;
  })
);
export const activeWorkspaceAtom = atom(
  (get) => get(specificWorkspaceAtom(get(activeWorkspaceIdAtom))),
  (get, set, updates: TUpdateWorkspaceDto) => {
    const list = get(workspacesListAtom);
    const activeId = get(activeWorkspaceIdAtom);
    const newList = list.map((ws) =>
      ws.id === activeId
        ? {
            ...ws,
            ...updates,
          }
        : ws
    );
    set(workspacesListAtom, newList);
  }
);
export const activePageAtom = atom(
  (get) => get(activeWorkspaceAtom)?.page ?? 0,
  (_get, set, page: number) => {
    set(activeWorkspaceAtom, { page });
  }
);
export const activeQueueAtom = atom(
  (get) => get(activeWorkspaceAtom)?.queue ?? null,
  (_get, set, queue: string) => {
    set(activeWorkspaceAtom, { queue, page: 0 });
  }
);
export const activeQueueLabelAtom = atom(
  (get) => get(activeWorkspaceAtom)?.queueLabel ?? null,
  (_get, set, queueLabel: string) => {
    set(activeWorkspaceAtom, { queueLabel, page: 0 });
  }
);
export const activeStatusAtom = atom(
  (get) => get(activeWorkspaceAtom)?.status ?? JobStatus.Active,
  (_get, set, status: JobStatus) => {
    set(activeWorkspaceAtom, { status, page: 0 });
  }
);
export const jobsOrderAtom = atom(
  (get) => get(activeWorkspaceAtom)?.order ?? OrderEnum.Asc,
  (_get, set, order: OrderEnum) => {
    set(activeWorkspaceAtom, { order, page: 0 });
  }
);
export const jobIdAtom = atom(
  (get) => get(activeWorkspaceAtom)?.jobId ?? '',
  (_get, set, jobId: string) => {
    set(activeWorkspaceAtom, { jobId, page: 0 });
  }
);
export const dataSearchAtom = atom(
  (get) => get(activeWorkspaceAtom)?.dataSearch ?? '',
  (_get, set, dataSearch: string) => {
    set(activeWorkspaceAtom, { dataSearch, page: 0 });
  }
);

// write only

export const addWorkspaceAtom = atom(
  null,
  (get, set, data: TAddWorkspaceDto) => {
    if (!data.queue || !data.queueLabel) return;
    const ws: TWorkspace = {
      id: uuidv4(),
      ...data,
      queue: data.queue,
      queueLabel: data.queueLabel,
    };
    const list = get(workspacesListAtom);
    if (list.length >= WorkspacesConfig.maxWorkspaces) {
      set(workspacesListAtom, tail(list).concat(ws));
    } else {
      set(workspacesListAtom, [...list, ws]);
    }
    set(activeWorkspaceIdAtom, ws.id);
  }
);
export const clearDataSearchAtom = atom(null, (_get, set) => {
  set(activeWorkspaceAtom, { dataSearch: '' });
});

export const removeWorkspaceAtom = atom(null, (get, set, id: string) => {
  const list = get(workspacesListAtom);
  const activeId = get(activeWorkspaceIdAtom);
  const idxToRemove = list.findIndex((ws) => ws.id === id);
  if (idxToRemove === -1) return;
  pullAt(list, idxToRemove);
  set(workspacesListAtom, [...list]);
  if (isempty(list)) {
    return set(activeWorkspaceIdAtom, null);
  }
  if (activeId === id) {
    const newActiveWorkspace =
      list[idxToRemove] || list[idxToRemove + 1] || list[idxToRemove - 1];
    if (newActiveWorkspace) {
      set(activeWorkspaceIdAtom, newActiveWorkspace.id);
    }
  }
});
